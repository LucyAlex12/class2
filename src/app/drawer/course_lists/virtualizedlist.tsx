
import { StyleSheet, Text, View, VirtualizedList } from 'react-native';

// Sample course data
const courses = [
  { id: '1', name: 'React Native', description: 'Learn mobile app development.' },
  { id: '2', name: 'JavaScript', description: 'Learn programming fundamentals.' },
  { id: '3', name: 'React.js', description: 'Learn frontend development.' },
  { id: '4', name: 'UI/UX Design', description: 'Learn interface design.' },
  { id: '5', name: 'Node.js', description: 'Learn backend development.' },
  { id: '6', name: 'Python', description: 'Learn Python programming.' },
  { id: '7', name: 'Flutter', description: 'Build cross-platform apps.' },
  { id: '8', name: 'Database Design', description: 'Learn how databases work.' },
];

export default function VirtualizedListDemoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available Courses</Text>

      <Text style={styles.subtitle}>
        Explore our programming courses
      </Text>

      <VirtualizedList
        data={courses}

        getItem={(data, index) => data[index]}

        getItemCount={(data) => data.length}

        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.courseName}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}

        initialNumToRender={4}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5FA',
    padding: 20,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#32063D',
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    marginTop: 5,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
  },

  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },

  description: {
    fontSize: 13,
    color: '#666',
    marginTop: 5,
  },
});
