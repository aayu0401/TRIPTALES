# TripTales - Community-Driven Travel Platform

TripTales is a premium social-travel platform where strangers book curated group trips and become friends through shared experiences.

## Features

- **Immersive Trip Showcase**: Beautiful trip cards with countdown timers, high-quality images, and detailed itineraries
- **Flexible Payment**: Pay only 50% upfront via Razorpay, balance due on trip day
- **WhatsApp Integration**: Direct inquiry and booking confirmation via WhatsApp
- **Real-time Countdown**: Live countdown timers showing time until trip departure
- **Testimonials**: Community reviews and experiences from past travelers
- **FAQ Section**: Comprehensive answers to common questions
- **Mobile-Responsive**: Fully optimized for all device sizes
- **Supabase Backend**: Secure data storage for trips, bookings, and testimonials

## Setup Instructions

### 1. Environment Variables

The `.env` file is already configured with Supabase credentials. You need to add your Razorpay key:

```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

To get your Razorpay key:
1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/signup)
2. Go to Settings → API Keys
3. Generate Test/Live keys
4. Copy the Key ID and paste it in `.env`

### 2. Database

The Supabase database is already set up with:
- `trips` table - stores trip information
- `bookings` table - stores booking details
- `testimonials` table - stores user reviews

Sample data has been populated with:
- Goa Villa Party Escape trip
- Bali Paradise Retreat trip
- 4 featured testimonials

### 3. WhatsApp Integration

WhatsApp links are configured to contact: **+91 88794 47678**

To customize:
- Open `src/components/TripDetails.tsx`
- Update the phone number in the `handleWhatsAppInquiry` function
- Open `src/components/BookingModal.tsx`
- Update the phone number in the payment success handler

### 4. Payment Flow

1. User clicks "Book Now" on a trip
2. Fills in booking details (name, email, phone, participants)
3. Reviews payment breakdown (50% now, 50% later)
4. Clicks "Proceed to Payment"
5. Razorpay checkout opens
6. On successful payment:
   - Booking saved to Supabase
   - Payment ID recorded
   - WhatsApp message auto-opens for confirmation
   - User receives booking confirmation

### 5. Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Key Components

- **Header**: Navigation bar with smooth scroll anchors
- **Hero**: Eye-catching landing section with value propositions
- **About**: How it works section with process steps
- **Trips**: Trip showcase with live countdown timers
- **TripDetails**: Modal with full itinerary, inclusions/exclusions
- **BookingModal**: Secure booking form with Razorpay integration
- **Testimonials**: Community reviews and ratings
- **FAQ**: Expandable accordion with common questions
- **Footer**: Contact info and social links

## Customization

### Adding New Trips

Use Supabase SQL editor or the execute_sql tool:

```sql
INSERT INTO trips (title, destination, description, price, start_date, end_date, max_participants, image_url, itinerary, highlights, inclusions, exclusions)
VALUES (...);
```

### Updating Trip Data

Edit existing trips directly in Supabase dashboard or via SQL queries.

### Customizing Design

- Colors: Update Tailwind classes in components (currently using emerald and blue)
- Images: Replace Pexels URLs with your own hosted images
- Fonts: Modify in `tailwind.config.js`

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Payments**: Razorpay
- **Messaging**: WhatsApp Business API integration

## Security Features

- Row Level Security (RLS) enabled on all tables
- Secure payment processing via Razorpay
- Email and phone validation
- HTTPS-only payment gateway
- Environment variable protection

## Mobile Optimization

- Responsive grid layouts
- Touch-friendly buttons and interactions
- Optimized images with lazy loading
- Mobile-first design approach
- Smooth scrolling navigation

## Support

For questions or issues, reach out via WhatsApp at +91 88794 47678 or email at hello@triptales.com

---

**Built with ❤️ for travelers who want to make friends while exploring the world**
