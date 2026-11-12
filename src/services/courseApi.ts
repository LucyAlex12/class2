import { supabase } from './supabase';

export type Course = {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  imagePath: string | null;
  imageUrl: string | null;
};

export type CourseCatalog = {
  courses: Course[];
  categoryAvailable: boolean;
};

const COURSE_IMAGE_BUCKET = 'course-images';

type CourseRow = {
  id: number;
  title: string;
  DESCRIPTION: string | null;
  category?: string | null;
  image_path?: string | null;
};

async function mapCourseRows(rows: CourseRow[]): Promise<Course[]> {
  return Promise.all(
    rows.map(async (row) => {
      let imageUrl: string | null = null;

      if (row.image_path) {
        const { data: signedImage, error: imageError } = await supabase.storage
          .from(COURSE_IMAGE_BUCKET)
          .createSignedUrl(row.image_path, 60 * 60);

        if (!imageError) imageUrl = signedImage.signedUrl;
      }

      return {
        id: row.id,
        title: row.title,
        description: row.DESCRIPTION,
        category: row.category?.trim() || null,
        imagePath: row.image_path ?? null,
        imageUrl,
      };
    })
  );
}

export async function getCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('id, title, DESCRIPTION, image_path')
    .order('title', { ascending: true });

  if (error) {
    const missingImageColumn =
      error.message.toLowerCase().includes('image_path') &&
      (error.message.toLowerCase().includes('does not exist') ||
        error.message.toLowerCase().includes('schema cache'));

    if (missingImageColumn) {
      const fallback = await supabase
        .from('courses')
        .select('id, title, DESCRIPTION')
        .order('title', { ascending: true });

      if (fallback.error) {
        throw new Error('Could not load courses: ' + fallback.error.message);
      }

      return mapCourseRows(fallback.data ?? []);
    }

    throw new Error('Could not load courses: ' + error.message);
  }

  return mapCourseRows(data ?? []);
}

function isMissingCategoryColumn(error: { message: string; details?: string | null; hint?: string | null }) {
  const message = `${error.message} ${error.details ?? ''} ${error.hint ?? ''}`.toLowerCase();
  return message.includes('category') && (message.includes('does not exist') || message.includes('schema cache'));
}

async function fetchCourseCatalog(offset?: number, pageSize?: number): Promise<CourseCatalog> {
  const selectCourses = async (includeCategory: boolean) => {
    const columns = includeCategory
      ? 'id, title, DESCRIPTION, image_path, category'
      : 'id, title, DESCRIPTION, image_path';

    let query = supabase.from('courses').select(columns).order('id', { ascending: true });

    if (offset !== undefined && pageSize !== undefined) {
      // Supabase range endpoints are inclusive: 0..9 returns the first 10 rows.
      query = query.range(offset, offset + pageSize - 1);
    }

    return query;
  };

  const result = await selectCourses(true);

  if (result.error) {
    if (!isMissingCategoryColumn(result.error)) {
      throw new Error('Could not load courses: ' + result.error.message);
    }

    const fallback = await selectCourses(false);
    if (fallback.error) {
      throw new Error('Could not load courses: ' + fallback.error.message);
    }

    return {
      courses: await mapCourseRows((fallback.data ?? []) as unknown as CourseRow[]),
      categoryAvailable: false,
    };
  }

  return {
    courses: await mapCourseRows((result.data ?? []) as unknown as CourseRow[]),
    categoryAvailable: true,
  };
}

export function getCourseCatalog(): Promise<CourseCatalog> {
  return fetchCourseCatalog();
}

export function getCoursePage(offset: number, pageSize: number): Promise<CourseCatalog> {
  if (!Number.isInteger(offset) || offset < 0 || !Number.isInteger(pageSize) || pageSize < 1) {
    throw new Error('Course page offset and size must be positive whole numbers.');
  }

  return fetchCourseCatalog(offset, pageSize);
}

export async function uploadCourseImage(
  courseId: number,
  uri: string,
  mimeType: string | null | undefined
): Promise<void> {
  const { File } = await import('expo-file-system');
  const file = new File(uri);
  const contentType = mimeType?.startsWith('image/') ? mimeType : 'image/jpeg';
  const extension = contentType === 'image/png' ? 'png' : contentType === 'image/webp' ? 'webp' : 'jpg';
  const imagePath = `${courseId}/${Date.now()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(COURSE_IMAGE_BUCKET)
    .upload(imagePath, await file.arrayBuffer(), {
      contentType,
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) throw new Error('Could not upload image: ' + uploadError.message);

  const { error: updateError } = await supabase
    .from('courses')
    .update({ image_path: imagePath })
    .eq('id', courseId);

  if (updateError) throw new Error('Image uploaded, but could not save it to the course: ' + updateError.message);
}
