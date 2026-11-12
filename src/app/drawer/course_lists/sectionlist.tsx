import { useMemo } from 'react';
import { ActivityIndicator, RefreshControl, SectionList, StyleSheet, Text, View } from 'react-native';

import { CourseCard } from '../../../components/course-card';
import {
  CourseEmptyState,
  CourseErrorState,
  CourseListPage,
  CourseWarning,
} from '../../../components/course-list-ui';
import { useCourseCatalog } from '../../../hooks/use-course-catalog';
import { Course } from '../../../services/courseApi';

type CourseSection = { title: string; data: Course[] };

export default function SectionListCategoriesScreen() {
  const { courses, loading, refreshing, error, categoryAvailable, refresh } = useCourseCatalog();

  const sections = useMemo<CourseSection[]>(() => {
    const grouped = new Map<string, Course[]>();

    for (const course of courses) {
      // Null or blank database categories use the visible fallback section.
      const sectionName = course.category?.trim() || 'Uncategorized';
      const group = grouped.get(sectionName) ?? [];
      group.push(course);
      grouped.set(sectionName, group);
    }

    return Array.from(grouped, ([title, data]) => ({ title, data })).sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }, [courses]);

  if (loading && courses.length === 0) {
    return (
      <CourseListPage title="SectionList Categories" subtitle="Loading categorized courses from Supabase.">
        <ActivityIndicator style={{ marginTop: 28 }} size="large" color="#32063D" />
      </CourseListPage>
    );
  }

  if (error && courses.length === 0) {
    return (
      <CourseListPage title="SectionList Categories" subtitle="Courses grouped by their database category.">
        <CourseErrorState message={error} onRetry={() => void refresh()} />
      </CourseListPage>
    );
  }

  return (
    <CourseListPage title="SectionList Categories" subtitle="Courses grouped by their actual Supabase category.">
      {categoryAvailable === false ? (
        <CourseWarning>
          The courses table does not have a category column yet. Courses are shown under “Uncategorized” until you run
          supabase/migrations/202611120002_add_course_category.sql and assign real categories.
        </CourseWarning>
      ) : null}
      {error ? <CourseWarning>{`Refresh failed: ${error}. Pull down to try again.`}</CourseWarning> : null}
      <SectionList
        sections={sections}
        keyExtractor={(course) => String(course.id)}
        renderItem={({ item }) => <CourseCard course={item} />}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionCount}>{section.data.length}</Text>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => void refresh()} tintColor="#32063D" />}
        ListEmptyComponent={<CourseEmptyState />}
        contentContainerStyle={{ paddingBottom: 20, flexGrow: courses.length === 0 ? 1 : undefined }}
        stickySectionHeadersEnabled={false}
      />
    </CourseListPage>
  );
}

const styles = StyleSheet.create({
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 9,
    marginTop: 2,
    marginBottom: 5,
  },
  sectionTitle: { color: '#562563', fontSize: 13, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },
  sectionCount: { color: '#785D82', fontSize: 12, fontWeight: '700' },
});
