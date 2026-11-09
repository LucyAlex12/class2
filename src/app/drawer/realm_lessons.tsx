
import { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import Realm from 'realm';
import { Lesson } from '../../../database/RealmLesson';

type LessonData = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

export default function RealmLessonsScreen() {
  const [realm, setRealm] = useState<Realm | null>(null);

  const [lessons, setLessons] = useState<LessonData[]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let database: Realm | null = null;

    async function openDatabase() {
      try {
        const openedDatabase = await Realm.open({
          schema: [Lesson],
        });

        if (!active) {
          openedDatabase.close();
          return;
        }

        database = openedDatabase;
        setRealm(openedDatabase);

        loadLessons(openedDatabase);
      } catch (error) {
        console.error('Realm error:', error);
        Alert.alert('Error', 'Could not open the database.');
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    openDatabase();

    return () => {
      active = false;
      database?.close();
    };
  }, []);

  function loadLessons(database: Realm) {
    const savedLessons = database.objects<Lesson>('Lesson');

    const lessonList: LessonData[] = Array.from(savedLessons).map(
      (item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        completed: item.completed,
      })
    );

    setLessons(lessonList);
  }

  function addLesson() {
    if (!realm) return;

    if (!title.trim() || !description.trim()) {
      Alert.alert('Missing information', 'Enter a title and description.');
      return;
    }

    const newLessonId = `${Date.now()}-${Math.random()}`;

    realm.write(() => {
      realm.create<Lesson>('Lesson', {
        id: newLessonId,
        title: title.trim(),
        description: description.trim(),
        completed: false,
      });
    });

    setTitle('');
    setDescription('');

    loadLessons(realm);
  }

  function toggleLesson(id: string) {
    if (!realm) return;

    const lesson = realm.objectForPrimaryKey<Lesson>('Lesson', id);

    if (!lesson) return;

    realm.write(() => {
      lesson.completed = !lesson.completed;
    });

    loadLessons(realm);
  }

  function deleteLesson(id: string) {
    if (!realm) return;

    const lesson = realm.objectForPrimaryKey<Lesson>('Lesson', id);

    if (!lesson) return;

    realm.write(() => {
      realm.delete(lesson);
    });

    loadLessons(realm);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Opening Realm database...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>LMS Lesson Manager</Text>

      <TextInput
        style={styles.input}
        placeholder="Lesson title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Lesson description"
        value={description}
        onChangeText={setDescription}
      />

      <Pressable style={styles.addButton} onPress={addLesson}>
        <Text style={styles.buttonText}>Add Lesson</Text>
      </Pressable>

      <Text style={styles.subheading}>Saved Lessons</Text>

      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>No lessons saved yet.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.lessonTitle}>{item.title}</Text>

            <Text style={styles.description}>
              {item.description}
            </Text>

            <Text style={styles.status}>
              {item.completed ? 'Completed' : 'Not completed'}
            </Text>

            <View style={styles.actions}>
              <Pressable
                style={styles.completeButton}
                onPress={() => toggleLesson(item.id)}
              >
                <Text style={styles.buttonText}>
                  {item.completed ? 'Undo' : 'Complete'}
                </Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteLesson(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
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
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#155EEF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  lessonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 6,
    color: '#475467',
  },
  status: {
    marginTop: 10,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  completeButton: {
    backgroundColor: '#1570EF',
    padding: 10,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#D92D20',
    padding: 10,
    borderRadius: 6,
  },
  empty: {
    color: '#667085',
    textAlign: 'center',
    marginTop: 20,
  },
});
