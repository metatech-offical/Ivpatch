-- Admin Products Extension Setup
-- Run this in the Supabase SQL Editor to add the required dynamic fields

-- 1. Add fields to existing Products table
ALTER TABLE products 
  ADD COLUMN IF NOT EXISTS short_description text,
  ADD COLUMN IF NOT EXISTS compare_at_price numeric(10, 2),
  ADD COLUMN IF NOT EXISTS splash_image_url text,
  ADD COLUMN IF NOT EXISTS splash_title text,
  ADD COLUMN IF NOT EXISTS splash_subtitle text;

-- 2. Setup the Product Images Storage Bucket
-- Ensure the storage bucket exists for file uploads from the Admin dashboard
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880, -- 5MB exactly
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET 
  public = true, 
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

-- 3. Set permissive public read access on bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'product-images' );

-- 4. Set authenticated upload access on bucket
CREATE POLICY "Authenticated Uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'product-images' );

CREATE POLICY "Authenticated Updates"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'product-images' );

CREATE POLICY "Authenticated Deletes"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'product-images' );
