import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: '#571BFB', // Using DEFAULT for the base color
        },
        blue: {
          DEFAULT: '#01A2EA',
        },
        pink: {
          DEFAULT: '#FE3CBB',
        },
        orange: {
          DEFAULT: '#FF7E00',
        },
        red: {
          DEFAULT: '#FF0000',
        },
        green: {
          DEFAULT: '#008000',
        },
        gray: {
          DEFAULT: '#333333',
        }
      },
      fontFamily: {
        'mona': ['"Mona Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
