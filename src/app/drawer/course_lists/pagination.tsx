
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

// Sample course data
const allCourses = [
  { id: '1', name: 'React Native', description: 'Learn mobile app development.' },
  { id: '2', name: 'JavaScript', description: 'Learn programming fundamentals.' },
  { id: '3', name: 'React.js', description: 'Learn frontend development.' },
  { id: '4', name: 'UI/UX Design', description: 'Learn interface design.' },
  { id: '5', name: 'Node.js', description: 'Learn backend development.' },
  { id: '6', name: 'Python', description: 'Learn Python programming.' },
  { id: '7', name: 'Flutter', description: 'Build cross-platform apps.' },
  { id: '8', name: 'Database Design', description: 'Learn database management.' },
  { id: '9', name: 'HTML & CSS', description: 'Learn web design basics.' },
];

const PAGE_SIZE = 3;

export default function PaginatedCoursesScreen() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Display only the number of courses currently requested
  const displayedCourses = allCourses.slice(0, visibleCount);

  // Load the next three courses
  const loadMore = () => {
    setVisibleCount((currentCount) => currentCount + PAGE_SIZE);
  };

  const hasMore = visibleCount < allCourses.length;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available Courses</Text>

      <Text style={styles.subtitle}>
        Showing {displayedCourses.length} of {allCourses.length} courses
      </Text>

      <FlatList
        data={displayedCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.courseName}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          hasMore ? (
              <Text style={styles.buttonText}>..loading more courses</Text>
          ) : (
            <Text style={styles.endMessage}>
              You have reached the end of the list.
            </Text>
          )
        }
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
    marginTop: 5,
    marginBottom: 20,
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

  button: {
    backgroundColor: '#32063D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  endMessage: {
    textAlign: 'center',
    color: '#666',
    padding: 20,
  },
});
