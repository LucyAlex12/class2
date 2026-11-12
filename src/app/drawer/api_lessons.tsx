import { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { Course, getCourses, uploadCourseImage } from '../../services/courseApi';

function getCoursePlaceholder(title: string): ImageSourcePropType {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes('python')) return require('../../../assets/images/pageimages/python.jpeg');
  if (normalizedTitle.includes('javascript')) return require('../../../assets/images/pageimages/javascript.jpeg');
  if (normalizedTitle.includes('node')) return require('../../../assets/images/pageimages/nodejs.jpeg');
  if (normalizedTitle.includes('react')) return require('../../../assets/images/pageimages/react.jpeg');

  return require('../../../assets/images/pageimages/Welcome.jpeg');
}

export default function APILessonsScreen() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [error, setError] = useState('');

  async function fetchCourses() {
    try {
      setError('');
      setCourses(await getCourses());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to retrieve courses.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  async function refreshCourses() {
    setRefreshing(true);
    await fetchCourses();
  }

  async function chooseImage(course: Course, camera: boolean) {
    try {
      if (camera) {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          Alert.alert('Camera permission needed', 'Allow camera access to take a course photo.');
          return;
        }
      } else {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
          Alert.alert('Photo permission needed', 'Allow photo access to choose a course image.');
          return;
        }
      }

      const result = camera
        ? await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.85 })
        : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.85 });

      if (result.canceled || !result.assets[0]) return;

      setUploadingId(course.id);
      await uploadCourseImage(course.id, result.assets[0].uri, result.assets[0].mimeType);
      await fetchCourses();
      Alert.alert('Image updated', `The image for ${course.title} has been saved.`);
    } catch (err) {
      Alert.alert('Could not update image', err instanceof Error ? err.message : 'Please try again.');
    } finally {
      setUploadingId(null);
    }
  }

  function showImageOptions(course: Course) {
    Alert.alert(`Course image`, `Choose how to update ${course.title}.`, [
      { text: 'Take a photo', onPress: () => void chooseImage(course, true) },
      { text: 'Choose from photos', onPress: () => void chooseImage(course, false) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#155EEF" />
        <Text>Loading courses...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available Courses</Text>

      {error ? (
        <View>
          <Text style={styles.error}>{error}</Text>
          <Pressable style={styles.button} onPress={refreshCourses}>
            <Text style={styles.buttonText}>Try Again</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => String(item.id)}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshCourses} />}
          ListEmptyComponent={<Text style={styles.empty}>No courses available.</Text>}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.imageFrame}>
                <Image
                  source={item.imageUrl ? { uri: item.imageUrl } : getCoursePlaceholder(item.title)}
                  style={styles.courseImage}
                  resizeMode="cover"
                />
                {!item.imageUrl && (
                  <View style={styles.placeholderBadge}>
                    <Text style={styles.placeholderText}>Sample image · change anytime</Text>
                  </View>
                )}
              </View>
              <Text style={styles.title}>{item.title}</Text>
              {!!item.description && <Text style={styles.description}>{item.description}</Text>}
              <Pressable
                style={[styles.button, uploadingId === item.id && styles.disabledButton]}
                disabled={uploadingId === item.id}
                onPress={() => showImageOptions(item)}
              >
                <Text style={styles.buttonText}>
                  {uploadingId === item.id ? 'Saving image...' : item.imagePath ? 'Change image' : 'Add image'}
                </Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F7FA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 10, marginBottom: 12 },
  imageFrame: { marginBottom: 12 },
  courseImage: { width: '100%', height: 180, borderRadius: 8, backgroundColor: '#EAECF0' },
  placeholderBadge: { position: 'absolute', right: 8, bottom: 8, paddingHorizontal: 9, paddingVertical: 6, borderRadius: 14, backgroundColor: '#FFFFFFE6' },
  placeholderText: { color: '#475467', fontSize: 12, fontWeight: '600' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#101828' },
  description: { marginTop: 8, color: '#475467' },
  error: { color: '#D92D20', marginBottom: 12 },
  empty: { textAlign: 'center', marginTop: 30 },
  button: { backgroundColor: '#155EEF', padding: 12, borderRadius: 8, marginTop: 14 },
  disabledButton: { opacity: 0.65 },
  buttonText: { color: '#FFFFFF', textAlign: 'center', fontWeight: 'bold' },
});
