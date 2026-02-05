import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          dark: '#E55A2B',
        },
        secondary: '#2C3E50',
        success: '#27AE60',
        warning: '#F39C12',
        danger: '#E74C3C',
        light: '#ECF0F1',
        medium: '#95A5A6',
        dark: '#2C3E50',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          '2xl': '430px',
        },
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'bounce-subtle': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
}

export default config