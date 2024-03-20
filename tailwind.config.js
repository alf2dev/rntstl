/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');
module.exports = {
  // mode: 'jit',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#430044',
          foreground: '#ffffff',
        },
        white: {
          DEFAULT: '#ffffff',
          foreground: '#430044',
        },
        primelight: {
          DEFAULT: '#ad4caf',
          foreground: '#ffffff',
        },
        violet: {
          DEFAULT: '#641fd2',
          foreground: '#ffffff',
        },
        carmine: {
          DEFAULT: '#c20735',
          foreground: '#ffffff',
        },
        gray: {
          DEFAULT: '#e8e8e8',
          foreground: '#430044',
        },
        darkgray: {
          DEFAULT: '#b6b6b6',
          foreground: '#ffffff',
        },
        verydarkgray: {
          DEFAULT: '#5e5e5e',
          foreground: '#ffffff',
        },
        primecancel: {
          DEFAULT: '#f31260',
          foreground: '#ffffff',
        },
        green: {
          DEFAULT: '#00622e',
          foreground: '#ffffff',
        },
      },
      screens: {
        '2xl': { max: '1535px' },
        xl: { max: '1200px' },
        lg: { max: '900px' },
        md: { max: '769px' },
        sm: { max: '540px' },
        xs: { max: '425px' },
        '2xs': { max: '320px' },
        '1hh': { raw: '((max-height: 780px) and (min-width: 769px))' },
      },
      borderRadius: {
        st: '10px',
        sm: '20px',
      },
      borderWidth: {
        small: "1px", // border-small
        medium: "2px", // border-medium
        large: "4px", // border-large
      },
      boxShadow: {
        default: '2px 2px 10px rgb(0 0 0 / 30%)',
      },
      fontFamily: {
        sans: ['var(--font-days-one)'],
        reenie: ['var(--font-reenie-beanie)'],
      },
      fontSize: {
        xss: ['0.625rem', '0.75rem'] /* 10px 12px */,
        sx: ['0.75rem', '1rem'] /* 12px 16px */,
        sm: ['0.875rem', '1.25rem'] /* 14px 20px */,
        base: ['1rem', '1.5rem'] /* 16px 24px */,
        lg: ['1.125rem', '1.75rem'] /* 18px 28px */,
        xl: ['1.25rem', '1.75rem'] /* 20px 28px */,
        '2xl': ['1.375rem', '2rem'] /* 22px 32px */,
        '3xl': ['1.5rem', '2rem'] /* 24px 32px */,
        '4xl': ['1.625rem', '2.125rem'] /* 26px 34px */,
        '5xl': ['1.875rem', '2.25rem'] /* 30px 36px */,
      },
    },
  },
  plugins: [nextui({})],
};
