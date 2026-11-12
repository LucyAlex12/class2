import { ActivityIndicator, RefreshControl, Text, VirtualizedList } from 'react-native';

import { CourseCard } from '../../../components/course-card';
import {
  CourseEmptyState,
  CourseErrorState,
  CourseListPage,
  CourseWarning,
} from '../../../components/course-list-ui';
import { useCourseCatalog } from '../../../hooks/use-course-catalog';
import { Course } from '../../../services/courseApi';

export default function VirtualizedListDemoScreen() {
  const { courses, loading, refreshing, error, refresh } = useCourseCatalog();

  if (loading && courses.length === 0) {
    return (
      <CourseListPage title="VirtualizedList Demo" subtitle="Loading real course records from Supabase.">
        <ActivityIndicator style={{ marginTop: 28 }} size="large" color="#32063D" />
      </CourseListPage>
    );
  }

  if (error && courses.length === 0) {
    return (
      <CourseListPage title="VirtualizedList Demo" subtitle="The lower-level virtualized list API.">
        <CourseErrorState message={error} onRetry={() => void refresh()} />
      </CourseListPage>
    );
  }

  return (
    <CourseListPage title="VirtualizedList Demo" subtitle={`${courses.length} courses rendered in a virtualized window`}>
      {error ? <CourseWarning>{`Refresh failed: ${error}. Pull down to try again.`}</CourseWarning> : null}
      {/* VirtualizedList owns the rendering window; FlatList is its simpler array-based wrapper. */}
      <VirtualizedList<Course>
        data={courses}
        getItem={(data: Course[], index: number) => data[index]}
        getItemCount={(data: Course[]) => data.length}
        keyExtractor={(course) => String(course.id)}
        renderItem={({ item, index }) => <CourseCard course={item} index={index} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => void refresh()} tintColor="#32063D" />}
        ListEmptyComponent={<CourseEmptyState />}
        ListHeaderComponent={
          <Text style={{ color: '#716A75', fontSize: 12, marginBottom: 12 }}>
            VirtualizedList renders a moving window of rows. FlatList is a convenient wrapper built on this component.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 20, flexGrow: courses.length === 0 ? 1 : undefined }}
      />
    </CourseListPage>
  );
}
