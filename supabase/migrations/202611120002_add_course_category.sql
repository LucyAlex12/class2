-- Adds category support for the SectionList class without changing existing rows.
alter table public.courses
  add column if not exists category text;

-- Existing courses remain uncategorized until their owners assign real categories.
