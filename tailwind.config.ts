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
          primary: '#571BFB',   // matches --primary-purple
          secondary: '#ECEBFF', // matches --secondary-purple
          tertiary: '#B198FF'   // matches --tertiary-purple
        },
        blue: {
          primary: '#01A2EA',   // matches --primary-blue
          secondary: '#F1FAFD', // matches --secondary-blue
          tertiary: '#DAF5FC'   // matches --tertiary-blue
        },
        pink: {
          primary: '#FE3CBB',   // matches --primary-pink
          secondary: '#FDECF9', // matches --secondary-pink
          tertiary: '#FCD8EF'   // matches --tertiary-pink
        },
        orange: {
          primary: '#FF7E00',   // matches --primary-orange
          secondary: '#FEF3F0', // matches --secondary-orange
          tertiary: '#FFE9DC'   // matches --tertiary-orange
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
