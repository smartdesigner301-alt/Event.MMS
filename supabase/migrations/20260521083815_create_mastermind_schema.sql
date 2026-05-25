/*
  # Mastermind Solution - Event Management Database Schema

  1. New Tables
    - `inquiries` - Stores event inquiry submissions from the budget calculator and contact forms
      - id (uuid, primary key)
      - full_name (text)
      - phone (text)
      - email (text)
      - event_date (date)
      - city (text)
      - guest_count (integer)
      - event_type (text) - wedding/birthday/corporate/concert
      - selected_services (text array)
      - selected_package (text)
      - estimated_budget (text)
      - additional_notes (text)
      - status (text, default 'pending')
      - created_at (timestamp)

    - `packages` - Event packages offered by the company
      - id (uuid, primary key)
      - name (text)
      - event_type (text)
      - description (text)
      - price_min (integer)
      - price_max (integer)
      - features (text array)
      - is_active (boolean, default true)
      - created_at (timestamp)

    - `testimonials` - Client testimonials
      - id (uuid, primary key)
      - client_name (text)
      - client_title (text)
      - message (text)
      - rating (integer)
      - event_type (text)
      - is_featured (boolean, default false)
      - created_at (timestamp)

    - `portfolio_items` - Portfolio/gallery items
      - id (uuid, primary key)
      - title (text)
      - category (text) - wedding/birthday/corporate/expo/concert
      - image_url (text)
      - description (text)
      - is_featured (boolean, default false)
      - created_at (timestamp)

    - `blog_posts` - Blog posts for the website
      - id (uuid, primary key)
      - title (text)
      - slug (text, unique)
      - excerpt (text)
      - content (text)
      - image_url (text)
      - category (text)
      - is_published (boolean, default false)
      - created_at (timestamp)

    - `bookings` - Confirmed event bookings
      - id (uuid, primary key)
      - inquiry_id (uuid, references inquiries)
      - event_date (date)
      - status (text, default 'confirmed')
      - total_amount (integer)
      - notes (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Public read access for packages, testimonials, portfolio_items, and published blog_posts
    - Authenticated admin access for all CRUD operations
    - Public insert for inquiries (form submissions)
*/

-- Inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  event_date date,
  city text DEFAULT '',
  guest_count integer DEFAULT 0,
  event_type text DEFAULT '',
  selected_services text[] DEFAULT '{}',
  selected_package text DEFAULT '',
  estimated_budget text DEFAULT '',
  additional_notes text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit inquiries"
  ON inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update inquiries"
  ON inquiries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete inquiries"
  ON inquiries FOR DELETE
  TO authenticated
  USING (true);

-- Packages table
CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  event_type text NOT NULL,
  description text DEFAULT '',
  price_min integer DEFAULT 0,
  price_max integer DEFAULT 0,
  features text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active packages"
  ON packages FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage packages"
  ON packages FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_title text DEFAULT '',
  message text NOT NULL,
  rating integer DEFAULT 5,
  event_type text DEFAULT '',
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Portfolio items table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  image_url text DEFAULT '',
  description text DEFAULT '',
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view portfolio items"
  ON portfolio_items FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage portfolio items"
  ON portfolio_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text DEFAULT '',
  content text DEFAULT '',
  image_url text DEFAULT '',
  category text DEFAULT '',
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage blog posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid REFERENCES inquiries(id) ON DELETE SET NULL,
  event_date date,
  status text DEFAULT 'confirmed',
  total_amount integer DEFAULT 0,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage bookings"
  ON bookings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert seed packages
INSERT INTO packages (name, event_type, description, price_min, price_max, features) VALUES
('Silver Package', 'wedding', 'Essential wedding planning with core services', 300000, 500000, ARRAY['Basic Decoration', 'Photography', 'Sound System', 'Stage Setup']),
('Gold Package', 'wedding', 'Premium wedding experience with enhanced services', 500000, 850000, ARRAY['Premium Decoration', 'Cinematic Photography', 'LED Screens', 'DJ Setup', 'Floral Entrance']),
('Platinum Package', 'wedding', 'Ultra-luxury wedding with all premium services', 850000, 1500000, ARRAY['Luxury Decoration', 'Drone Photography', 'LED Dance Floor', 'VIP Lounge', 'Live Band', 'Fireworks']),
('Silver Package', 'birthday', 'Fun birthday celebration with essentials', 150000, 300000, ARRAY['Theme Decoration', 'Balloon Setup', 'Photography', 'Sound System']),
('Gold Package', 'birthday', 'Stylish birthday with premium touches', 300000, 500000, ARRAY['Custom Theme', 'Premium Balloon Art', 'Cinematic Video', 'DJ Setup', 'Cake Table Design']),
('Platinum Package', 'birthday', 'Ultimate birthday extravaganza', 500000, 800000, ARRAY['Luxury Theme', 'LED Walls', 'Drone Coverage', 'Live Entertainment', 'VIP Setup', 'Custom Stage']),
('Silver Package', 'corporate', 'Professional corporate event management', 200000, 400000, ARRAY['Stage Setup', 'Sound System', 'Branding', 'Photography']),
('Gold Package', 'corporate', 'Enhanced corporate event experience', 400000, 700000, ARRAY['Premium Stage', 'LED Screens', 'Stall Design', 'Video Coverage', 'Branding Materials']),
('Platinum Package', 'corporate', 'Full-scale corporate event production', 700000, 1200000, ARRAY['Luxury Stage', 'Multi-Screen Setup', '3D Stall Design', 'Drone Coverage', 'Live Streaming', 'VIP Lounge']),
('Silver Package', 'concert', 'Essential concert setup', 250000, 450000, ARRAY['Sound System', 'Basic Lighting', 'Stage Setup', 'Security']),
('Gold Package', 'concert', 'Premium concert production', 450000, 800000, ARRAY['Professional Sound', 'LED Lighting', 'LED Screens', 'Pyrotechnics', 'Artist Management']),
('Platinum Package', 'concert', 'World-class concert experience', 800000, 1500000, ARRAY['Line Array Sound', 'Full LED Stage', 'Laser Show', 'Pyrotechnics', 'Live Streaming', 'VIP Boxes', 'Drone Coverage']);

-- Insert seed testimonials
INSERT INTO testimonials (client_name, client_title, message, rating, event_type, is_featured) VALUES
('Sarah Ahmed', 'Bride', 'Mastermind Solution turned our wedding into a fairy tale. Every detail was perfect, from the floral entrance to the grand stage. Truly extraordinary!', 5, 'wedding', true),
('Ali Khan', 'CEO, TechVenture', 'The corporate expo they organized was world-class. Professional team, flawless execution, and stunning stall designs. Highly recommended!', 5, 'corporate', true),
('Fatima Noor', 'Birthday Celebrant', 'My birthday was magical! The theme, the decorations, the energy - everything was beyond my expectations. Thank you Mastermind!', 5, 'birthday', true),
('Hassan Raza', 'Event Producer', 'The concert production was phenomenal. Sound, lighting, LED screens - everything was top-tier. A truly premium experience.', 5, 'concert', true),
('Ayesha Malik', 'Bride', 'From planning to execution, the team was incredible. Our engagement ceremony was elegant and memorable. Best decision we made!', 5, 'wedding', true),
('Omar Siddiqui', 'Marketing Director', 'Their branding and stall design for our exhibition was outstanding. We received so many compliments. Professional and creative team!', 5, 'corporate', true);
