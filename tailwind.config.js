/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'castillo': {
          'blue': '#0A3D62',
          'ocean': '#1B4F72',
          'coral': '#FF6B35',
          'sand': '#F7DC6F',
          'wave': '#3498DB',
        }
      },
      fontFamily: {
        'castillo': ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'ocean-wave': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1440 320\"%3E%3Cpath fill=\"%230A3D62\" fill-opacity=\"0.3\" d=\"M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z\"%3E%3C/path%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        castillo: {
          "primary": "#0A3D62",
          "secondary": "#FF6B35",
          "accent": "#3498DB",
          "neutral": "#2C3E50",
          "base-100": "#FFFFFF",
          "info": "#3498DB",
          "success": "#27AE60",
          "warning": "#F39C12",
          "error": "#E74C3C",
        },
      },
    ],
  },
}
