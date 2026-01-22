import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Trip {
  id: string;
  title: string;
  destination: string;
  description: string;
  price: number;
  start_date: string;
  end_date: string;
  max_participants: number;
  current_participants: number;
  image_url: string;
  itinerary: Array<{
    day: number;
    title: string;
    activities: string[];
  }>;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  status: string;
  created_at: string;
}

export interface Booking {
  id: string;
  trip_id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  participants_count: number;
  total_amount: number;
  paid_amount: number;
  payment_status: string;
  payment_id: string | null;
  whatsapp_notified: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  user_name: string;
  user_image: string;
  trip_destination: string;
  rating: number;
  review: string;
  is_featured: boolean;
  created_at: string;
}
