import { type Href, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const demonstrations = [
  {
    route: '/drawer/course_lists/flatlist',
    number: '01',
    title: 'FlatList Courses',
    description: 'Render all courses efficiently, with pull-to-refresh.',
  },
  {
    route: '/drawer/course_lists/sectionlist',
    number: '02',
    title: 'SectionList Categories',
    description: 'Group courses under their Supabase category.',
  },
  {
    route: '/drawer/course_lists/virtualizedlist',
    number: '03',
    title: 'VirtualizedList Demo',
    description: 'See the lower-level list API that FlatList builds on.',
  },
  {
    route: '/drawer/course_lists/pagination',
    number: '04',
    title: 'Paginated Courses',
    description: 'Load ten courses at a time with Supabase range queries.',
  },
];

export default function CourseListsHome() {
  const router = useRouter();

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>VIDEO 3 · PRACTICAL</Text>
      <Text style={styles.heading}>React Native Lists</Text>
      <Text style={styles.subtitle}>Choose a demonstration to explore real courses from Supabase.</Text>

      {demonstrations.map((demo) => (
        <Pressable
          key={demo.route}
          accessibilityRole="button"
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={() => router.push(demo.route as Href)}
        >
          <View style={styles.numberBox}>
            <Text style={styles.number}>{demo.number}</Text>
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>{demo.title}</Text>
            <Text style={styles.cardDescription}>{demo.description}</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F6F4F8' },
  content: { padding: 20, paddingBottom: 32 },
  kicker: { color: '#785D82', fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  heading: { marginTop: 8, color: '#24152A', fontSize: 28, fontWeight: '800' },
  subtitle: { marginTop: 7, marginBottom: 22, color: '#716A75', fontSize: 14, lineHeight: 21 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEE8F1',
  },
  cardPressed: { opacity: 0.78 },
  numberBox: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0E7F3' },
  number: { color: '#562563', fontSize: 13, fontWeight: '800' },
  cardText: { flex: 1, marginLeft: 13 },
  cardTitle: { color: '#24152A', fontSize: 15, fontWeight: '800' },
  cardDescription: { marginTop: 4, color: '#716A75', fontSize: 12, lineHeight: 17 },
  arrow: { marginLeft: 8, color: '#785D82', fontSize: 27, fontWeight: '300' },
});
