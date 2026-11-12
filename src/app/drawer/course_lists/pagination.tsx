import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, Text } from 'react-native';

import { CourseCard } from '../../../components/course-card';
import {
  CourseEmptyState,
  CourseErrorState,
  CourseListEnd,
  CourseListPage,
  CourseWarning,
} from '../../../components/course-list-ui';
import { Course, getCoursePage } from '../../../services/courseApi';

const PAGE_SIZE = 10;

function uniqueCourses(courses: Course[]): Course[] {
  const seen = new Set<number>();
  return courses.filter((course) => {
    if (seen.has(course.id)) return false;
    seen.add(course.id);
    return true;
  });
}

function appendUniqueCourses(current: Course[], incoming: Course[]): Course[] {
  const existingIds = new Set(current.map((course) => course.id));
  return [...current, ...incoming.filter((course) => !existingIds.has(course.id))];
}

export default function PaginatedCoursesScreen() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState('');
  const [paginationError, setPaginationError] = useState('');

  // Refs lock requests and keep the paging cursor current without relying on async state updates.
  const requestGeneration = useRef(0);
  const refreshInFlight = useRef(false);
  const loadMoreInFlight = useRef(false);
  const nextOffset = useRef(0);
  const hasMoreRef = useRef(true);
  const paginationErrorRef = useRef(false);
  const hasLoadedSuccessfully = useRef(false);

  const refreshCourses = useCallback(async () => {
    const thisGeneration = ++requestGeneration.current;
    refreshInFlight.current = true;
    paginationErrorRef.current = false;
    setPaginationError('');
    setError('');
    setLoadingMore(false);

    if (hasLoadedSuccessfully.current) setRefreshing(true);
    else setLoading(true);

    try {
      const firstPage = await getCoursePage(0, PAGE_SIZE);
      if (thisGeneration !== requestGeneration.current) return;

      setCourses(uniqueCourses(firstPage.courses));
      nextOffset.current = firstPage.courses.length;
      hasMoreRef.current = firstPage.courses.length === PAGE_SIZE;
      setHasMore(hasMoreRef.current);
      hasLoadedSuccessfully.current = true;
    } catch (requestError) {
      if (thisGeneration === requestGeneration.current) {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load courses.');
      }
    } finally {
      if (thisGeneration === requestGeneration.current) {
        refreshInFlight.current = false;
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (
      refreshInFlight.current ||
      loadMoreInFlight.current ||
      !hasMoreRef.current ||
      paginationErrorRef.current
    ) {
      return;
    }

    loadMoreInFlight.current = true;
    setLoadingMore(true);
    setPaginationError('');
    const thisGeneration = requestGeneration.current;
    const start = nextOffset.current;

    try {
      const nextPage = await getCoursePage(start, PAGE_SIZE);
      if (thisGeneration !== requestGeneration.current) return;

      setCourses((current) => appendUniqueCourses(current, nextPage.courses));
      // The server range is inclusive, so the next start advances by rows received.
      nextOffset.current = start + nextPage.courses.length;
      hasMoreRef.current = nextPage.courses.length === PAGE_SIZE;
      setHasMore(hasMoreRef.current);
    } catch (requestError) {
      if (thisGeneration === requestGeneration.current) {
        paginationErrorRef.current = true;
        setPaginationError(requestError instanceof Error ? requestError.message : 'Could not load more courses.');
      }
    } finally {
      loadMoreInFlight.current = false;
      if (thisGeneration === requestGeneration.current) setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => void refreshCourses(), 0);
    return () => clearTimeout(timer);
  }, [refreshCourses]);

  const retryMore = () => {
    paginationErrorRef.current = false;
    setPaginationError('');
    void loadMore();
  };

  const footer = loadingMore ? (
    <CourseListEnd>
      <ActivityIndicator size="small" color="#32063D" />
      {'  '}Loading more courses…
    </CourseListEnd>
  ) : paginationError ? (
    <CourseListEnd>
      <Text style={styles.footerError}>{paginationError}</Text>
      <Pressable style={styles.retryButton} onPress={retryMore}>
        <Text style={styles.retryButtonText}>Retry loading more</Text>
      </Pressable>
    </CourseListEnd>
  ) : !hasMore && courses.length > 0 ? (
    <CourseListEnd>You’ve reached the end of the course list.</CourseListEnd>
  ) : null;

  if (loading && courses.length === 0) {
    return (
      <CourseListPage title="Paginated Courses" subtitle={`Loading the first ${PAGE_SIZE} courses from Supabase.`}>
        <ActivityIndicator style={{ marginTop: 28 }} size="large" color="#32063D" />
      </CourseListPage>
    );
  }

  if (error && courses.length === 0) {
    return (
      <CourseListPage title="Paginated Courses" subtitle="Ten courses per page, ordered by course ID.">
        <CourseErrorState message={error} onRetry={() => void refreshCourses()} />
      </CourseListPage>
    );
  }

  return (
    <CourseListPage title="Paginated Courses" subtitle={`Showing ${courses.length} course${courses.length === 1 ? '' : 's'} · ${PAGE_SIZE} per page`}>
      {error ? <CourseWarning>{`Refresh failed: ${error}. Existing courses are still shown; pull down to retry.`}</CourseWarning> : null}
      <FlatList
        data={courses}
        keyExtractor={(course) => String(course.id)}
        renderItem={({ item, index }) => <CourseCard course={item} index={index} />}
        onEndReached={() => void loadMore()}
        onEndReachedThreshold={0.4}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => void refreshCourses()} tintColor="#32063D" />}
        ListEmptyComponent={<CourseEmptyState />}
        ListFooterComponent={footer}
        contentContainerStyle={{ paddingBottom: 20, flexGrow: courses.length === 0 ? 1 : undefined }}
      />
    </CourseListPage>
  );
}

const styles = StyleSheet.create({
  footerError: { color: '#B42318', textAlign: 'center', fontSize: 12, lineHeight: 18 },
  retryButton: { marginTop: 9, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, backgroundColor: '#32063D' },
  retryButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
});
