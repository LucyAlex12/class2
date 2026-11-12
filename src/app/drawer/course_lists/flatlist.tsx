import { ActivityIndicator, FlatList, RefreshControl, Text } from 'react-native';

import { CourseCard } from '../../../components/course-card';
import {
  CourseEmptyState,
  CourseErrorState,
  CourseListPage,
  CourseWarning,
} from '../../../components/course-list-ui';
import { useCourseCatalog } from '../../../hooks/use-course-catalog';

export default function FlatListCoursesScreen() {
  const { courses, loading, refreshing, error, refresh } = useCourseCatalog();

  if (loading && courses.length === 0) {
    return (
      <CourseListPage title="FlatList Courses" subtitle="Loading real course records from Supabase.">
        <ActivityIndicator style={{ marginTop: 28 }} size="large" color="#32063D" />
      </CourseListPage>
    );
  }

  if (error && courses.length === 0) {
    return (
      <CourseListPage title="FlatList Courses" subtitle="Courses from the live database.">
        <CourseErrorState message={error} onRetry={() => void refresh()} />
      </CourseListPage>
    );
  }

  return (
    <CourseListPage title="FlatList Courses" subtitle={`${courses.length} course${courses.length === 1 ? '' : 's'} from Supabase`}>
      {error ? <CourseWarning>{`Refresh failed: ${error}. Pull down to try again.`}</CourseWarning> : null}
      <FlatList
        data={courses}
        keyExtractor={(course) => String(course.id)}
        renderItem={({ item, index }) => <CourseCard course={item} index={index} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => void refresh()} tintColor="#32063D" />}
        ListEmptyComponent={<CourseEmptyState />}
        ListFooterComponent={refreshing ? <Text style={{ textAlign: 'center', padding: 12 }}>Refreshing…</Text> : null}
        contentContainerStyle={{ paddingBottom: 20, flexGrow: courses.length === 0 ? 1 : undefined }}
      />
    </CourseListPage>
  );
}
