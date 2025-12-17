import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D5A3D',
          50: '#E8F0EA',
          100: '#D1E1D5',
          200: '#A3C3AB',
          300: '#75A581',
          400: '#478757',
          500: '#2D5A3D',
          600: '#244831',
          700: '#1B3625',
          800: '#122418',
          900: '#09120C',
        },
        secondary: {
          DEFAULT: '#87A878',
          50: '#F4F7F2',
          100: '#E9EFE5',
          200: '#D3DFCB',
          300: '#BDCFB1',
          400: '#A7BF97',
          500: '#87A878',
          600: '#6C8660',
          700: '#516548',
          800: '#364330',
          900: '#1B2218',
        },
        accent: {
          DEFAULT: '#C4704B',
          50: '#FAF0EB',
          100: '#F5E1D7',
          200: '#EBC3AF',
          300: '#E1A587',
          400: '#D7875F',
          500: '#C4704B',
          600: '#9D5A3C',
          700: '#76432D',
          800: '#4F2D1E',
          900: '#28160F',
        },
        cream: {
          DEFAULT: '#FAF8F5',
          50: '#FFFFFF',
          100: '#FAF8F5',
          200: '#F0EBE3',
          300: '#E6DED1',
          400: '#DCD1BF',
          500: '#D2C4AD',
        },
      },
      fontFamily: {
        heading: ['var(--font-dm-sans)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config

