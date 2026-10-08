/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#080C14',
          noir: '#0B0F17',
          surface: '#121826',
          card: '#182032',
          border: '#222F46',
          blue: {
            DEFAULT: '#2563EB',
            light: '#3B82F6',
            hover: '#1D4ED8',
            dim: '#1E3A8A',
            glow: '#60A5FA'
          },
          gold: {
            DEFAULT: '#F59E0B',
            light: '#FBBF24'
          },
          white: '#FFFFFF',
          slate: '#F8FAFC',
          muted: '#94A3B8'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(37, 99, 235, 0.45)',
        'glow-gold': '0 0 20px -3px rgba(245, 158, 11, 0.35)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
