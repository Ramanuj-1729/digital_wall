/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      primary: "#F75961",
      white: "#ffffff",
      black: "#000000",
      gray48: "#717171",
      textDefault: "#222222",
      textPlaceholder: "#B0B0B0",
      blue90: "#CAF8FF",
      yellow70: "#FFCC66",
      interactiveOneHover: "#AF273E",
      interactiveOneDefault: "#D33852",
      surfaceSelected: "#EBFCFF",
      violet80: "#C5C5FC",
      pink70: "#FFAEC0",
      teal: "#23856D",
      border: "#EBEBEB",
      subtitle: "#2B2B2B",
    },
    fontFamily: {
      'poppins': ['"Poppins"', 'sans-serif']
    },
    screens: {
      'smallPhone': '320px', // Phone - portrait
      'largePhone': '480px', // Phone - landscape + portrait
      'smallTablet': '600px', // Small tablet - portrait
      'mediumTablet': '768px', // Large tablet - portrait
      'largeTablet': '1024px', // Large tablet - landscape
      'desktop': '1280px', // Desktop
      'wideScreen': '1440px', // Wide Screen Desktop
    },
  },
  plugins: [],
}

