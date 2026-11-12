import { useCallback, useEffect, useRef, useState } from 'react';

import { Course, getCourseCatalog } from '../services/courseApi';

export function useCourseCatalog() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [categoryAvailable, setCategoryAvailable] = useState<boolean | null>(null);
  const requestId = useRef(0);
  const hasLoaded = useRef(false);

  const refresh = useCallback(async () => {
    const currentRequest = ++requestId.current;
    const isFirstLoad = !hasLoaded.current;

    if (isFirstLoad) setLoading(true);
    else setRefreshing(true);
    setError('');

    try {
      const result = await getCourseCatalog();
      if (currentRequest !== requestId.current) return;

      setCourses(result.courses);
      setCategoryAvailable(result.categoryAvailable);
    } catch (requestError) {
      if (currentRequest === requestId.current) {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load courses.');
      }
    } finally {
      if (currentRequest === requestId.current) {
        hasLoaded.current = true;
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => void refresh(), 0);
    return () => clearTimeout(timer);
  }, [refresh]);

  return { courses, loading, refreshing, error, categoryAvailable, refresh };
}
