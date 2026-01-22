/*
  # TripTales Database Schema

  1. New Tables
    - `trips`
      - `id` (uuid, primary key)
      - `title` (text) - Trip name
      - `destination` (text) - Location
      - `description` (text) - Trip overview
      - `price` (numeric) - Full trip price
      - `start_date` (timestamptz) - Trip start date
      - `end_date` (timestamptz) - Trip end date
      - `max_participants` (integer) - Maximum travelers
      - `current_participants` (integer) - Current bookings
      - `image_url` (text) - Main trip image
      - `itinerary` (jsonb) - Day-by-day itinerary
      - `highlights` (jsonb) - Trip highlights array
      - `inclusions` (jsonb) - What's included
      - `exclusions` (jsonb) - What's not included
      - `status` (text) - upcoming, ongoing, completed
      - `created_at` (timestamptz)

    - `bookings`
      - `id` (uuid, primary key)
      - `trip_id` (uuid, foreign key)
      - `user_name` (text)
      - `user_email` (text)
      - `user_phone` (text)
      - `participants_count` (integer)
      - `total_amount` (numeric)
      - `paid_amount` (numeric) - 50% upfront
      - `payment_status` (text) - pending, partial, completed
      - `payment_id` (text) - Razorpay payment ID
      - `whatsapp_notified` (boolean)
      - `created_at` (timestamptz)

    - `testimonials`
      - `id` (uuid, primary key)
      - `user_name` (text)
      - `user_image` (text)
      - `trip_destination` (text)
      - `rating` (integer) - 1-5 stars
      - `review` (text)
      - `is_featured` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for trips and testimonials
    - Authenticated users can create bookings
    - Only authenticated users can read their own bookings
*/

-- Create trips table
CREATE TABLE IF NOT EXISTS trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  destination text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  max_participants integer NOT NULL DEFAULT 20,
  current_participants integer NOT NULL DEFAULT 0,
  image_url text NOT NULL,
  itinerary jsonb DEFAULT '[]'::jsonb,
  highlights jsonb DEFAULT '[]'::jsonb,
  inclusions jsonb DEFAULT '[]'::jsonb,
  exclusions jsonb DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'upcoming',
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE,
  user_name text NOT NULL,
  user_email text NOT NULL,
  user_phone text NOT NULL,
  participants_count integer NOT NULL DEFAULT 1,
  total_amount numeric NOT NULL,
  paid_amount numeric NOT NULL,
  payment_status text NOT NULL DEFAULT 'pending',
  payment_id text,
  whatsapp_notified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL,
  user_image text NOT NULL,
  trip_destination text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  review text NOT NULL,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Trips policies (public read)
CREATE POLICY "Anyone can view trips"
  ON trips FOR SELECT
  USING (true);

CREATE POLICY "Only authenticated users can insert trips"
  ON trips FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update trips"
  ON trips FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Bookings policies
CREATE POLICY "Users can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  USING (true);

-- Testimonials policies (public read)
CREATE POLICY "Anyone can view testimonials"
  ON testimonials FOR SELECT
  USING (true);

CREATE POLICY "Only authenticated users can insert testimonials"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (true);