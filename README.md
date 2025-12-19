# AllenCleaning - Professional Cleaning Service Website

A modern, SEO-optimized website for AllenCleaning, a professional cleaning service based in Bay Area, California. Built with Next.js 16 and deployed on Vercel.

## Features

- **Beautiful Landing Page** - Warm, welcoming design with earth tones
- **Estimate Request Form** - Comprehensive form with all service options
- **Admin Dashboard** - View all customer requests at `/admin`
- **SEO Optimized** - Local business schema, meta tags, and Open Graph support
- **Mobile Responsive** - Perfect experience on all devices
- **Fast Loading** - Optimized for Core Web Vitals

## Services Offered

- Regular Cleaning
- Deep Cleaning
- Move-in / Move-out Cleaning
- Post-construction Cleaning
- Office Cleaning

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd cleaning-website-form
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the website.

## Admin Dashboard

Access the admin dashboard at `/admin` to view all estimate requests.

### Features:

- **View all requests** - See customer details, service type, and preferences
- **New request alerts** - New submissions are highlighted
- **Auto-refresh** - Automatically updates every 30 seconds
- **Mark as read** - Clear the "new" indicator on viewed requests
- **Delete requests** - Remove old or spam requests
- **Mobile-friendly** - Check requests from your phone

### How to use:

1. Bookmark `yourdomain.vercel.app/admin`
2. Check periodically for new requests
3. Click on a request to expand and see full details
4. Tap the phone number to call directly
5. Tap the email to send a reply

## Deployment to Vercel

### Option 1: Deploy via GitHub

1. Push your code to a GitHub repository

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub

3. Click "New Project" and import your repository

4. Click "Deploy" - No environment variables needed!

### Option 2: Deploy via CLI

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Main landing page
│   ├── globals.css         # Global styles and Tailwind
│   ├── admin/
│   │   └── page.tsx        # Admin dashboard
│   ├── api/
│   │   ├── submit-estimate/
│   │   │   └── route.ts    # Form submission endpoint
│   │   └── estimates/
│   │       └── route.ts    # Get/manage estimates endpoint
│   └── components/
│       ├── Header.tsx      # Navigation header
│       ├── Hero.tsx        # Hero section
│       ├── Services.tsx    # Services showcase
│       ├── WhyUs.tsx       # Trust indicators
│       ├── EstimateForm.tsx# Estimate request form
│       └── Footer.tsx      # Footer with contact info
├── lib/
│   └── estimates-store.ts  # Data storage utilities
├── data/
│   └── estimates.json      # Local data storage (dev only)
├── tailwind.config.ts      # Tailwind configuration
└── package.json
```

## Data Storage

- **Development**: Data is stored in `data/estimates.json`
- **Production (Vercel)**: Data is stored in `/tmp/estimates.json`

> **Note**: On Vercel's serverless functions, data in `/tmp` may be cleared on cold starts. For a business with high volume, consider upgrading to Vercel KV (free tier available) for persistent storage.

## Contact Information

- **Business**: AllenCleaning
- **Phone**: (732) 372-3329
- **Service Area**: Bay Area, California

## License

Private - All rights reserved.

# cleaning-website-form
