-- ======================================================
-- IVPATCH E-COMMERCE - FULL DATABASE SCHEMA
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)
-- ======================================================

-- 0. ENABLE UUID EXTENSION (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ======================================================
-- 1. PROFILES TABLE (mirrors auth.users with extra fields)
-- ======================================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, first_name, last_name, phone)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'phone', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ======================================================
-- 2. USER ADDRESSES TABLE
-- ======================================================
CREATE TABLE IF NOT EXISTS user_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    address_type VARCHAR(20) DEFAULT 'shipping' CHECK (address_type IN ('shipping', 'billing')),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    country VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ======================================================
-- 3. PRODUCTS TABLE
-- ======================================================
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    compare_at_price DECIMAL(10, 2),
    cost_per_item DECIMAL(10, 2),
    sku VARCHAR(100) UNIQUE,
    barcode VARCHAR(100),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
    featured BOOLEAN DEFAULT false,
    track_inventory BOOLEAN DEFAULT true,
    total_inventory INT DEFAULT 0,
    low_stock_threshold INT DEFAULT 10,
    meta_title VARCHAR(255),
    meta_description TEXT,
    ingredients TEXT,
    usage_instructions TEXT,
    benefits TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ======================================================
-- 4. PRODUCT IMAGES TABLE
-- ======================================================
CREATE TABLE IF NOT EXISTS product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    sort_order INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ======================================================
-- 5. PRODUCT VARIANTS TABLE
-- ======================================================
CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_name VARCHAR(255) NOT NULL,
    sku VARCHAR(100) UNIQUE,
    barcode VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    compare_at_price DECIMAL(10, 2),
    cost_per_item DECIMAL(10, 2),
    inventory_quantity INT DEFAULT 0,
    weight DECIMAL(10, 2),
    option1_name VARCHAR(100),
    option1_value VARCHAR(100),
    option2_name VARCHAR(100),
    option2_value VARCHAR(100),
    option3_name VARCHAR(100),
    option3_value VARCHAR(100),
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ======================================================
-- 6. COLLECTIONS TABLE
-- ======================================================
CREATE TABLE IF NOT EXISTS collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    sort_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ======================================================
-- 7. PRODUCT COLLECTIONS JUNCTION TABLE
-- ======================================================
CREATE TABLE IF NOT EXISTS product_collections (
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
    sort_order INT DEFAULT 0,
    PRIMARY KEY (product_id, collection_id)
);

-- ======================================================
-- 8. CARTS TABLE
-- ======================================================
CREATE TABLE IF NOT EXISTS carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    session_id VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);

-- ======================================================
-- 9. CART ITEMS TABLE
-- ======================================================
CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    price_at_time DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(cart_id, product_id, variant_id)
);

-- ======================================================
-- INDEXES
-- ======================================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_carts_user_id ON carts(user_id);
CREATE INDEX IF NOT EXISTS idx_carts_session_id ON carts(session_id);
CREATE INDEX IF NOT EXISTS idx_user_addresses_user_id ON user_addresses(user_id);

-- ======================================================
-- ROW LEVEL SECURITY (RLS)
-- ======================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- PROFILES: Users can read/update own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Allow the trigger to INSERT profiles
CREATE POLICY "Service can insert profiles" ON profiles
    FOR INSERT WITH CHECK (true);

-- PRODUCTS: Public read for active products
CREATE POLICY "Anyone can view active products" ON products
    FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can do everything with products" ON products
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- PRODUCT IMAGES: Public read
CREATE POLICY "Anyone can view product images" ON product_images
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage product images" ON product_images
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- PRODUCT VARIANTS: Public read
CREATE POLICY "Anyone can view product variants" ON product_variants
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage product variants" ON product_variants
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- COLLECTIONS: Public read
CREATE POLICY "Anyone can view visible collections" ON collections
    FOR SELECT USING (is_visible = true);

CREATE POLICY "Admins can manage collections" ON collections
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- PRODUCT COLLECTIONS: Public read
CREATE POLICY "Anyone can view product collections" ON product_collections
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage product collections" ON product_collections
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- CARTS: Users can manage their own cart
CREATE POLICY "Users can view own cart" ON carts
    FOR SELECT USING (
        user_id = auth.uid() OR 
        (user_id IS NULL AND session_id IS NOT NULL)
    );

CREATE POLICY "Users can create carts" ON carts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own cart" ON carts
    FOR UPDATE USING (
        user_id = auth.uid() OR 
        (user_id IS NULL AND session_id IS NOT NULL)
    );

CREATE POLICY "Users can delete own cart" ON carts
    FOR DELETE USING (user_id = auth.uid());

-- CART ITEMS: Users can manage items in their cart
CREATE POLICY "Users can view own cart items" ON cart_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM carts 
            WHERE carts.id = cart_items.cart_id 
            AND (carts.user_id = auth.uid() OR (carts.user_id IS NULL AND carts.session_id IS NOT NULL))
        )
    );

CREATE POLICY "Users can insert cart items" ON cart_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM carts 
            WHERE carts.id = cart_items.cart_id 
            AND (carts.user_id = auth.uid() OR (carts.user_id IS NULL AND carts.session_id IS NOT NULL))
        )
    );

CREATE POLICY "Users can update own cart items" ON cart_items
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM carts 
            WHERE carts.id = cart_items.cart_id 
            AND (carts.user_id = auth.uid() OR (carts.user_id IS NULL AND carts.session_id IS NOT NULL))
        )
    );

CREATE POLICY "Users can delete own cart items" ON cart_items
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM carts 
            WHERE carts.id = cart_items.cart_id 
            AND (carts.user_id = auth.uid() OR (carts.user_id IS NULL AND carts.session_id IS NOT NULL))
        )
    );

-- USER ADDRESSES: Users can manage their own addresses
CREATE POLICY "Users can view own addresses" ON user_addresses
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own addresses" ON user_addresses
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own addresses" ON user_addresses
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own addresses" ON user_addresses
    FOR DELETE USING (user_id = auth.uid());

-- ======================================================
-- STORAGE BUCKET FOR PRODUCT IMAGES
-- ======================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to product images
CREATE POLICY "Public can view product images" ON storage.objects
    FOR SELECT USING (bucket_id = 'product-images');

-- Allow admins to upload product images
CREATE POLICY "Admins can upload product images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'product-images' AND
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Admins can update product images" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'product-images' AND
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Admins can delete product images" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'product-images' AND
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ======================================================
-- SEED DATA: Sample Products
-- ======================================================

-- Insert sample products
INSERT INTO products (name, slug, description, short_description, base_price, compare_at_price, sku, status, featured, total_inventory, ingredients, usage_instructions, benefits) VALUES
(
    'Collagen Formula',
    'collagen-formula',
    'Our premium Collagen Formula patch delivers hydrolysed collagen peptides directly through the skin for maximum absorption. Designed for those who want to support skin elasticity, joint health, and overall vitality without the need for pills or powders.',
    'Transdermal collagen support for skin & joints',
    94.00,
    129.00,
    'IVP-COL-001',
    'active',
    true,
    150,
    'Hydrolysed Marine Collagen, Vitamin C, Hyaluronic Acid, Vitamin E',
    'Apply one patch to clean, dry skin on the inner arm or torso. Wear for 8-12 hours. Replace daily.',
    'Supports skin elasticity and hydration, Promotes joint flexibility, Supports hair and nail growth'
),
(
    'Neuro Boost',
    'neuro-boost',
    'Unlock your cognitive potential with our Neuro Boost patch. This cutting-edge formula combines nootropic nutrients delivered transdermally for sustained mental clarity, focus, and memory support throughout the day.',
    'Cognitive enhancement & mental clarity patch',
    94.00,
    129.00,
    'IVP-NRB-002',
    'active',
    true,
    120,
    'Lion''s Mane Extract, Alpha-GPC, Bacopa Monnieri, Vitamin B6, Ginkgo Biloba',
    'Apply one patch in the morning to clean, dry skin. Wear for 8-12 hours for sustained cognitive support.',
    'Enhanced focus and concentration, Supports memory and recall, Promotes mental clarity and alertness'
),
(
    'Immunity',
    'immunity',
    'Strengthen your body''s natural defenses with our Immunity patch. A powerful blend of immune-supporting nutrients delivered continuously through the skin for all-day protection.',
    'Daily immune system support patch',
    94.00,
    119.00,
    'IVP-IMM-003',
    'active',
    false,
    200,
    'Zinc, Vitamin C, Vitamin D3, Elderberry Extract, Echinacea',
    'Apply one patch daily to clean, dry skin. For enhanced protection during cold season, use consistently for 30+ days.',
    'Strengthens natural immune response, Provides antioxidant protection, Supports respiratory health'
),
(
    'NMN/NAD+',
    'nmn-nad',
    'Our most advanced anti-aging formula. NMN/NAD+ patches deliver nicotinamide mononucleotide directly into your system for cellular energy production and longevity support.',
    'Advanced cellular rejuvenation patch',
    94.00,
    149.00,
    'IVP-NMN-004',
    'active',
    true,
    80,
    'Nicotinamide Mononucleotide (NMN), Resveratrol, CoQ10, Pterostilbene',
    'Apply one patch to clean, dry skin in the morning or evening. Wear for 12-24 hours for optimal absorption.',
    'Supports cellular energy production, Promotes healthy aging at the cellular level, Enhanced NAD+ bioavailability'
),
(
    'Muscle Fuel',
    'muscle-fuel',
    'Designed for athletes and fitness enthusiasts. Muscle Fuel patches deliver essential amino acids and recovery nutrients directly through the skin for faster muscle recovery and peak performance.',
    'Athletic recovery & performance patch',
    94.00,
    129.00,
    'IVP-MFL-005',
    'active',
    false,
    100,
    'BCAAs (L-Leucine, L-Isoleucine, L-Valine), L-Glutamine, Magnesium, B-Complex',
    'Apply one patch 30 minutes before workout or immediately after. Wear for 8-12 hours during recovery.',
    'Accelerates muscle recovery, Reduces post-workout soreness, Supports lean muscle maintenance'
),
(
    'Energy Release',
    'energy-release',
    'Sustained energy without the crash. Our Energy Release patch provides a steady stream of natural energy-boosting nutrients throughout the day—no jitters, no afternoon slump.',
    'All-day natural energy support',
    94.00,
    119.00,
    'IVP-ENR-006',
    'active',
    false,
    130,
    'Vitamin B12, Green Tea Extract, Iron, CoQ10, Guarana',
    'Apply one patch in the morning to clean, dry skin on the upper arm or torso. Wear for 8-12 hours.',
    'Sustained energy without caffeine crash, Supports natural metabolism, Reduces fatigue and mental fog'
),
(
    'Erectile Dysfunction',
    'erectile-dysfunction',
    'A discreet, prescription-grade transdermal solution for supporting male vitality and circulation. Our ED patch delivers targeted nutrients that support healthy blood flow and performance.',
    'Men''s vitality & circulation support',
    94.00,
    149.00,
    'IVP-ED-007',
    'active',
    false,
    60,
    'L-Arginine, L-Citrulline, Ginseng Extract, Zinc, Horny Goat Weed',
    'Apply one patch to clean, dry skin on the inner arm or lower abdomen. Wear for 8-12 hours. Use 2 hours before desired effect.',
    'Supports healthy blood circulation, Promotes male vitality and confidence, Discreet and easy to use'
);

-- Insert product images (using local paths — these map to your /public folder)
INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT id, '/product1.svg', 'Collagen Formula patch', 0, true FROM products WHERE slug = 'collagen-formula'
UNION ALL
SELECT id, '/product2.svg', 'Neuro Boost patch', 0, true FROM products WHERE slug = 'neuro-boost'
UNION ALL
SELECT id, '/product3.svg', 'Immunity patch', 0, true FROM products WHERE slug = 'immunity'
UNION ALL
SELECT id, '/product4.svg', 'NMN/NAD+ patch', 0, true FROM products WHERE slug = 'nmn-nad'
UNION ALL
SELECT id, '/product5.svg', 'Muscle Fuel patch', 0, true FROM products WHERE slug = 'muscle-fuel'
UNION ALL
SELECT id, '/product6.svg', 'Energy Release patch', 0, true FROM products WHERE slug = 'energy-release'
UNION ALL
SELECT id, '/product7.svg', 'Erectile Dysfunction patch', 0, true FROM products WHERE slug = 'erectile-dysfunction';

-- Insert product variants (one default variant per product + a 3-pack option for some)
INSERT INTO product_variants (product_id, variant_name, sku, price, compare_at_price, inventory_quantity, option1_name, option1_value)
SELECT id, 'Single Patch (30-Day)', 'IVP-COL-001-S', 94.00, 129.00, 80, 'Pack Size', '1 Month' FROM products WHERE slug = 'collagen-formula'
UNION ALL
SELECT id, '3-Pack Bundle', 'IVP-COL-001-3P', 249.00, 387.00, 40, 'Pack Size', '3 Months' FROM products WHERE slug = 'collagen-formula'
UNION ALL
SELECT id, 'Single Patch (30-Day)', 'IVP-NRB-002-S', 94.00, 129.00, 60, 'Pack Size', '1 Month' FROM products WHERE slug = 'neuro-boost'
UNION ALL
SELECT id, '3-Pack Bundle', 'IVP-NRB-002-3P', 249.00, 387.00, 30, 'Pack Size', '3 Months' FROM products WHERE slug = 'neuro-boost'
UNION ALL
SELECT id, 'Single Patch (30-Day)', 'IVP-IMM-003-S', 94.00, 119.00, 100, 'Pack Size', '1 Month' FROM products WHERE slug = 'immunity'
UNION ALL
SELECT id, '3-Pack Bundle', 'IVP-IMM-003-3P', 249.00, 357.00, 50, 'Pack Size', '3 Months' FROM products WHERE slug = 'immunity'
UNION ALL
SELECT id, 'Single Patch (30-Day)', 'IVP-NMN-004-S', 94.00, 149.00, 40, 'Pack Size', '1 Month' FROM products WHERE slug = 'nmn-nad'
UNION ALL
SELECT id, '3-Pack Bundle', 'IVP-NMN-004-3P', 259.00, 447.00, 20, 'Pack Size', '3 Months' FROM products WHERE slug = 'nmn-nad'
UNION ALL
SELECT id, 'Single Patch (30-Day)', 'IVP-MFL-005-S', 94.00, 129.00, 50, 'Pack Size', '1 Month' FROM products WHERE slug = 'muscle-fuel'
UNION ALL
SELECT id, 'Single Patch (30-Day)', 'IVP-ENR-006-S', 94.00, 119.00, 70, 'Pack Size', '1 Month' FROM products WHERE slug = 'energy-release'
UNION ALL
SELECT id, 'Single Patch (30-Day)', 'IVP-ED-007-S', 94.00, 149.00, 30, 'Pack Size', '1 Month' FROM products WHERE slug = 'erectile-dysfunction';

-- Insert sample collections
INSERT INTO collections (name, slug, description, sort_order, is_visible) VALUES
('Wellness', 'wellness', 'Essential wellness patches for daily vitality', 0, true),
('Performance', 'performance', 'Athletic and cognitive performance boosters', 1, true),
('Anti-Aging', 'anti-aging', 'Advanced formulas for cellular rejuvenation', 2, true),
('Men''s Health', 'mens-health', 'Targeted solutions for male wellness', 3, true);

-- Link products to collections
INSERT INTO product_collections (product_id, collection_id, sort_order)
SELECT p.id, c.id, 0 FROM products p, collections c WHERE p.slug = 'collagen-formula' AND c.slug = 'wellness'
UNION ALL
SELECT p.id, c.id, 0 FROM products p, collections c WHERE p.slug = 'collagen-formula' AND c.slug = 'anti-aging'
UNION ALL
SELECT p.id, c.id, 1 FROM products p, collections c WHERE p.slug = 'neuro-boost' AND c.slug = 'performance'
UNION ALL
SELECT p.id, c.id, 2 FROM products p, collections c WHERE p.slug = 'immunity' AND c.slug = 'wellness'
UNION ALL
SELECT p.id, c.id, 0 FROM products p, collections c WHERE p.slug = 'nmn-nad' AND c.slug = 'anti-aging'
UNION ALL
SELECT p.id, c.id, 3 FROM products p, collections c WHERE p.slug = 'muscle-fuel' AND c.slug = 'performance'
UNION ALL
SELECT p.id, c.id, 4 FROM products p, collections c WHERE p.slug = 'energy-release' AND c.slug = 'performance'
UNION ALL
SELECT p.id, c.id, 0 FROM products p, collections c WHERE p.slug = 'erectile-dysfunction' AND c.slug = 'mens-health';

-- ======================================================
-- DONE! Your database is ready.
-- 
-- NEXT STEPS:
-- 1. Go to Authentication → Settings → Turn OFF "Enable email confirmations" for Phase 1
-- 2. Register an admin user, then manually set their role:
--    UPDATE profiles SET role = 'admin' WHERE email = 'your-admin@email.com';
-- ======================================================
