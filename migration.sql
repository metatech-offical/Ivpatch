-- ======================================================
-- IVPATCH - SUPABASE SCHEMA MIGRATION FOR FIREBASE AUTH (UPDATED V2)
-- Run this in your Supabase SQL Editor (Dashboard -> SQL Editor)
-- ======================================================

-- 1. Drop all dependent RLS policies to avoid type alteration blocks
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Service can insert profiles" ON profiles;

DROP POLICY IF EXISTS "Users can view own addresses" ON user_addresses;
DROP POLICY IF EXISTS "Users can insert own addresses" ON user_addresses;
DROP POLICY IF EXISTS "Users can update own addresses" ON user_addresses;
DROP POLICY IF EXISTS "Users can delete own addresses" ON user_addresses;

DROP POLICY IF EXISTS "Users can view own cart" ON carts;
DROP POLICY IF EXISTS "Users can create carts" ON carts;
DROP POLICY IF EXISTS "Users can update own cart" ON carts;
DROP POLICY IF EXISTS "Users can delete own cart" ON carts;

DROP POLICY IF EXISTS "Users can view own cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can insert cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can update own cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can delete own cart items" ON cart_items;

DROP POLICY IF EXISTS "Admins can do everything with products" ON products;
DROP POLICY IF EXISTS "Admins can manage product images" ON product_images;
DROP POLICY IF EXISTS "Admins can manage product variants" ON product_variants;
DROP POLICY IF EXISTS "Admins can manage collections" ON collections;
DROP POLICY IF EXISTS "Admins can manage product collections" ON product_collections;

DROP POLICY IF EXISTS "Admins can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete product images" ON storage.objects;

-- 2. Disable Row Level Security (RLS) on user tables
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses DISABLE ROW LEVEL SECURITY;
ALTER TABLE carts DISABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items DISABLE ROW LEVEL SECURITY;

-- 3. Drop existing foreign key constraints referencing profiles
ALTER TABLE IF EXISTS user_addresses DROP CONSTRAINT IF EXISTS user_addresses_user_id_fkey;
ALTER TABLE IF EXISTS carts DROP CONSTRAINT IF EXISTS carts_user_id_fkey;
ALTER TABLE IF EXISTS profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- 4. Alter column types from UUID to VARCHAR(255) to support Firebase UIDs
ALTER TABLE profiles ALTER COLUMN id TYPE VARCHAR(255);
ALTER TABLE user_addresses ALTER COLUMN user_id TYPE VARCHAR(255);
ALTER TABLE carts ALTER COLUMN user_id TYPE VARCHAR(255);

-- 5. Drop NOT NULL constraint from email to support optional/blank emails
ALTER TABLE profiles ALTER COLUMN email DROP NOT NULL;

-- 6. Re-add foreign key constraints using the new VARCHAR type
ALTER TABLE user_addresses 
  ADD CONSTRAINT user_addresses_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

ALTER TABLE carts 
  ADD CONSTRAINT carts_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE SET NULL;

-- 7. Recreate admin policies (casting auth.uid() to text to compare with VARCHAR id)
CREATE POLICY "Admins can do everything with products" ON products
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()::text AND role = 'admin')
    );

CREATE POLICY "Admins can manage product images" ON product_images
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()::text AND role = 'admin')
    );

CREATE POLICY "Admins can manage product variants" ON product_variants
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()::text AND role = 'admin')
    );

CREATE POLICY "Admins can manage collections" ON collections
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()::text AND role = 'admin')
    );

CREATE POLICY "Admins can manage product collections" ON product_collections
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()::text AND role = 'admin')
    );

CREATE POLICY "Admins can upload product images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'product-images' AND
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()::text AND role = 'admin')
    );

CREATE POLICY "Admins can update product images" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'product-images' AND
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()::text AND role = 'admin')
    );

CREATE POLICY "Admins can delete product images" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'product-images' AND
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()::text AND role = 'admin')
    );
