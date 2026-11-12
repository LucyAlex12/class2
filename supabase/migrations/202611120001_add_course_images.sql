-- Store image paths on courses and keep the source images in a private bucket.
alter table public.courses
  add column if not exists image_path text;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'course-images',
  'course-images',
  false,
  6291456,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

-- This app uses only the public anon key and has no verified login. The owner
-- explicitly chose to let any app user change course images, so keep anonymous
-- writes limited to the image path field and image files in this bucket.
grant update (image_path) on public.courses to anon;

drop policy if exists "Allow app users to update course image paths" on public.courses;
create policy "Allow app users to update course image paths"
  on public.courses
  for update
  to anon
  using (true)
  with check (true);

drop policy if exists "Allow app users to upload course images" on storage.objects;
create policy "Allow app users to upload course images"
  on storage.objects
  for insert
  to anon
  with check (
    bucket_id = 'course-images'
    and name ~ '^[0-9]+/[0-9]+\.(jpg|png|webp)$'
  );

-- The app needs SELECT to issue signed URLs for private images. This also lets
-- anonymous clients list object metadata in this bucket.
drop policy if exists "Allow app users to read course images" on storage.objects;
create policy "Allow app users to read course images"
  on storage.objects
  for select
  to anon
  using (bucket_id = 'course-images');
