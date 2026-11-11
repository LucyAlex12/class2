import { useEffect, useState } from 'react';

import {
    ActivityIndicator,
    FlatList,
    Pressable,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    Course,
    getCourses,
} from '../../services/courseApi';

export default function APILessonsScreen() {
  const [courses, setCourses] = useState<Course[]>([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState('');

  async function fetchCourses() {
    try {
      setError('');

      const result = await getCourses();

      setCourses(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to retrieve courses.'
      );
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
      <Text style={styles.heading}>
        Available Courses
      </Text>

      {error ? (
        <View>
          <Text style={styles.error}>{error}</Text>

          <Pressable
            style={styles.button}
            onPress={refreshCourses}
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => String(item.id)}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshCourses}
            />
          }
          ListEmptyComponent={
            <Text style={styles.empty}>
              No courses available.
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.description}>
                {item.description}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101828',
  },

  description: {
    marginTop: 8,
    color: '#475467',
  },

  error: {
    color: '#D92D20',
    marginBottom: 12,
  },

  empty: {
    textAlign: 'center',
    marginTop: 30,
  },

  button: {
    backgroundColor: '#155EEF',
    padding: 12,
    borderRadius: 8,
  },

  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
