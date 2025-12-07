import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        light: {
          primary: "#5f5e5d",
          "primary-content": "#ffffff",

          secondary: "#767472",
          "secondary-content": "#ffffff",

          accent: "#f0d3c6",

          neutral: "#f0d3c6",

          "base-100": "#ffffff",
          "base-200": "#f0d3c6",
          "base-300": "#eb003f",
          "base-content": "#2c2b2b",

          info: "#2094f3",
          success: "#009444",
          warning: "#ff9900",
          error: "#ff5724",
        },
      },
      "dark",
    ],
  },
};
