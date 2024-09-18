/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#1EA1F1", // Primary color (example)
          "background-color": "#F1F5F9", // Setting the background color to slate-100
          ".btn-twitter": {
            "background-color": "#FFFFFF",
            "border-color": "#1EA1F1",
          },
          ".btn-twitter:hover": {
            "background-color": "#FFFFFF",
            "border-color": "#1C96E1",
          },
        },
      },
    ],
  },

};
