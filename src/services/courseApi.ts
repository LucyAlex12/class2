import { supabase } from './supabase';

export type Course = {
  id: number;
  title: string;
  description: string | null;
};

export async function getCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('id, title, DESCRIPTION')
    .order('title', { ascending: true });

  if (error) {
    throw new Error('Could not load courses: ' + error.message);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    description: row.DESCRIPTION,
  }));
}
