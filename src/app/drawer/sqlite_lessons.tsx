
import { useEffect, useState } from 'react';
import {View,Text, TextInput, Pressable, FlatList, StyleSheet, Alert,
  ActivityIndicator,
} from 'react-native';

import * as SQLite from 'expo-sqlite';

type Lesson = {
  id: number;
  title: string;
  description: string;
  completed: number;
};

export default function SQLiteLessonsScreen() {  
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  // Open the database and create the lessons table.
  useEffect(() => {
    let active = true;
    let database: SQLite.SQLiteDatabase | null = null;

    //Setup the database and create the lessons table if it doesn't exist.
    async function setupDatabase() {
      try {
        database = await SQLite.openDatabaseAsync('lms.db');

        await database.execAsync('CREATE TABLE IF NOT EXISTS lessons (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT NOT NULL, completed INTEGER NOT NULL DEFAULT 0);');

        if (active) {
          setDb(database);
          await loadLessons(database);
        }
      } catch (error) {
        Alert.alert('Database error', 'Could not open the database.');
      } finally {
        if (active) setLoading(false);
      }
    }

    setupDatabase();

    return () => {active = false; };
      // The database connection is kept open for this app session.
  }, []);

  // Retrieve lessons from SQLite.
  async function loadLessons(database: SQLite.SQLiteDatabase) {
    const result = await database.getAllAsync<Lesson>(
      'SELECT * FROM lessons ORDER BY id DESC'
    );

    setLessons(result);
  }

  // Add a lesson.
  async function addLesson() {
    if (!db) return;

    if (!title.trim() || !description.trim()) {
      Alert.alert('Missing information', 'Enter a title and description.');
      return;
    }

    try {
      await db.runAsync(
        'INSERT INTO lessons (title, description) VALUES (?, ?)',
        title,
        description.trim()
      );

      setTitle('');
      setDescription('');
      await loadLessons(db);
    } catch (error) {
      Alert.alert('Error', 'Could not save the lesson.');
    }
  }

  // Mark a lesson as completed.
  async function markCompleted(id: number) {
    if (!db) return;

    try {
      await db.runAsync(
        'UPDATE lessons SET completed = 1 WHERE id = ?',
        id
      );

      await loadLessons(db);
    } catch (error) {
      Alert.alert('Error', 'Could not update the lesson.');
    }
  }

  // Delete a lesson.
  async function deleteLesson(id: number) {
    if (!db) return;

    try {
      await db.runAsync(
        'DELETE FROM lessons WHERE id = ?',
        id
      );

      await loadLessons(db);
    } catch (error) {
      Alert.alert('Error', 'Could not delete the lesson.');
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Opening lesson database...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SQLite Lesson Library</Text>

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
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No lessons saved yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.lessonCard}>
            <Text style={styles.lessonTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.id}</Text>


            <Text>
              Status: {item.completed === 1 ? 'Completed' : 'Not completed'}
            </Text>

            {item.completed === 0 && (
              <Pressable
                style={styles.completeButton}
                onPress={() => markCompleted(item.id)}
              >
                <Text style={styles.buttonText}>Mark Completed</Text>
              </Pressable>
            )}

            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteLesson(item.id)}
            >
              <Text style={styles.buttonText}>Delete Lesson</Text>
            </Pressable>
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
    paddingTop: 25,
    backgroundColor: '#FFFFFF',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
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
  subheading: {
    fontSize: 19,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  lessonCard: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    gap: 9,
  },
  lessonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: '#1570EF',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#B42318',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
});
