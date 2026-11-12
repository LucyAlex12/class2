import { Stack } from 'expo-router';

export default function CourseListsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTintColor: '#32063D',
        headerTitleStyle: { fontWeight: '800' },
        contentStyle: { backgroundColor: '#F6F4F8' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Course Lists' }} />
      <Stack.Screen name="flatlist" options={{ title: 'FlatList Courses' }} />
      <Stack.Screen name="sectionlist" options={{ title: 'SectionList Categories' }} />
      <Stack.Screen name="virtualizedlist" options={{ title: 'VirtualizedList Demo' }} />
      <Stack.Screen name="pagination" options={{ title: 'Paginated Courses' }} />
    </Stack>
  );
}
