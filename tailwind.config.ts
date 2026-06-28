import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Sleek Premium Theme (Obsidian/Zinc neutral dark, avoiding blue 'AI slop')
        navy: { // Cozy Indigo Night Theme (for magical Aetheria ambiance)
          900: '#0B0914', // Deep Obsidian Purple
          800: '#131124', // Midnight Violet
          700: '#1D1A39', // Dark Mana Purple
          600: '#342F5E', // Muted Indigo
          500: '#524C8C', // Slate Lavender
          400: '#948ECA', // Bright Lavender
          100: '#F5F3FF', // Soft White Cream
        },
        game: {
          contradiction: '#EF4444', 
          correlation: '#10B981',   
          context: '#F59E0B',       
          irrelevant: '#71717A',    
          weak: '#A78BFA',          // Soft Mana Purple
          accent: '#EC4899',        // Magic Pink/Rose
          warm: '#F59E0B',          // Warm Magitech Gold
        },
      },
      fontFamily: {
        body: ['Plus Jakarta Sans', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
