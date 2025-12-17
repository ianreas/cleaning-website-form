# Raushan Cleaning - Professional Cleaning Service Website

A modern, SEO-optimized website for Raushan Cleaning, a professional cleaning service based in Pleasanton, California. Built with Next.js 14 and deployed on Vercel.

## Features

- **Beautiful Landing Page** - Warm, welcoming design with earth tones
- **Estimate Request Form** - Comprehensive form with all service options
- **SMS Notifications** - Instant Twilio SMS alerts when customers request estimates
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

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **SMS**: Twilio
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Twilio account (for SMS notifications)

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

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` with your Twilio credentials:
   ```
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=+1234567890
   RECIPIENT_PHONE_NUMBER=+16469886601
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) to see the website.

## Setting Up Twilio

1. **Create a Twilio Account**
   - Go to [twilio.com](https://www.twilio.com) and sign up
   - Verify your phone number

2. **Get Your Credentials**
   - In the [Twilio Console](https://console.twilio.com/), find your:
     - Account SID
     - Auth Token
   
3. **Get a Phone Number**
   - Go to Phone Numbers → Manage → Buy a number
   - Choose a number with SMS capability
   - Note: Twilio offers a free trial with $15 credit

4. **Verify Recipient Number (Trial accounts only)**
   - If using a trial account, verify the recipient phone number at:
   - Phone Numbers → Manage → Verified Caller IDs

## Deployment to Vercel

### Option 1: Deploy via GitHub

1. Push your code to a GitHub repository

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub

3. Click "New Project" and import your repository

4. Add environment variables in the Vercel dashboard:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_PHONE_NUMBER`
   - `RECIPIENT_PHONE_NUMBER`

5. Click "Deploy"

### Option 2: Deploy via CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variables when prompted or via the dashboard

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Main landing page
│   ├── globals.css         # Global styles and Tailwind
│   ├── api/
│   │   └── submit-estimate/
│   │       └── route.ts    # Twilio SMS endpoint
│   └── components/
│       ├── Header.tsx      # Navigation header
│       ├── Hero.tsx        # Hero section
│       ├── Services.tsx    # Services showcase
│       ├── WhyUs.tsx       # Trust indicators
│       ├── EstimateForm.tsx# Estimate request form
│       └── Footer.tsx      # Footer with contact info
├── lib/
│   └── twilio.ts           # Twilio client configuration
├── .env.example            # Environment variables template
├── tailwind.config.ts      # Tailwind configuration
└── package.json
```

## Contact Information

- **Business**: Raushan Cleaning
- **Phone**: (732) 372-3329
- **Service Area**: Pleasanton, California

## License

Private - All rights reserved.

# cleaning-website-form
