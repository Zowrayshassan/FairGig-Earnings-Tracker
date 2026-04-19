/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/screens_html/**/*.html"
  ],
  darkMode: "class",
  theme: {
      extend: {
          "colors": {
              "primary-fixed": "#9ef3d6",
              "primary-container": "#006b54",
              "on-error": "#ffffff",
              "on-surface": "#181d1b",
              "surface-variant": "#dfe3e1",
              "on-tertiary": "#ffffff",
              "surface-tint": "#016b54",
              "background": "#f6faf7",
              "surface-container-lowest": "#ffffff",
              "inverse-on-surface": "#eef2ef",
              "error": "#ba1a1a",
              "on-error-container": "#93000a",
              "secondary-fixed-dim": "#b1ccc5",
              "surface-container-low": "#f0f5f2",
              "surface-container-highest": "#dfe3e1",
              "surface-container": "#ebefec",
              "tertiary-fixed": "#ffdcbe",
              "outline": "#6f7a74",
              "on-secondary-container": "#4e6862",
              "on-tertiary-fixed": "#2d1600",
              "on-secondary-fixed": "#06201b",
              "on-tertiary-container": "#ffd0a4",
              "inverse-surface": "#2d3130",
              "primary-fixed-dim": "#82d7ba",
              "on-tertiary-fixed-variant": "#6a3c00",
              "on-primary-fixed-variant": "#00513f",
              "secondary": "#4a635d",
              "outline-variant": "#bec9c3",
              "error-container": "#ffdad6",
              "on-secondary": "#ffffff",
              "primary": "#00513f",
              "tertiary": "#6a3c00",
              "on-secondary-fixed-variant": "#334b46",
              "inverse-primary": "#82d7ba",
              "tertiary-fixed-dim": "#ffb871",
              "on-primary-container": "#94e8cb",
              "tertiary-container": "#8b5000",
              "secondary-container": "#cae6de",
              "on-surface-variant": "#3e4944",
              "on-background": "#181d1b",
              "surface-dim": "#d7dbd8",
              "on-primary-fixed": "#002118",
              "secondary-fixed": "#cde8e1",
              "surface": "#f6faf7",
              "on-primary": "#ffffff",
              "surface-container-high": "#e5e9e6",
              "surface-bright": "#f6faf7"
          },
          "fontFamily": {
              "headline": ["Plus Jakarta Sans"],
              "body": ["Inter"],
              "label": ["Inter"]
          }
      }
  },
  plugins: [],
}
