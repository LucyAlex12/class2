import { Image, StyleSheet, Text, View } from 'react-native';

import { Course } from '../services/courseApi';

type CourseCardProps = {
  course: Course;
  index?: number;
};

export function CourseCard({ course, index }: CourseCardProps) {
  const initials = course.title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');

  return (
    <View style={styles.card}>
      {course.imageUrl ? (
        <Image source={{ uri: course.imageUrl }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageInitials}>{initials || 'CO'}</Text>
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{course.title}</Text>
          {index !== undefined && <Text style={styles.number}>#{index + 1}</Text>}
        </View>
        {course.category ? <Text style={styles.category}>{course.category}</Text> : null}
        {course.description ? <Text style={styles.description}>{course.description}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEE8F1',
    shadowColor: '#1D1022',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  image: { width: 70, height: 70, borderRadius: 12, backgroundColor: '#F0E9F3' },
  imagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9DDF0',
  },
  imageInitials: { color: '#32063D', fontSize: 22, fontWeight: '800' },
  content: { flex: 1, marginLeft: 14 },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 },
  title: { flex: 1, color: '#24152A', fontSize: 16, fontWeight: '800' },
  number: { color: '#7A6681', fontSize: 12, fontWeight: '700' },
  category: {
    alignSelf: 'flex-start',
    marginTop: 7,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: 'hidden',
    color: '#562563',
    backgroundColor: '#F4ECF7',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  description: { marginTop: 7, color: '#6B6470', fontSize: 13, lineHeight: 19 },
});
