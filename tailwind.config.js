/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/SiteComponents/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "7xl": "1920px",
      },
      colors: {
        primary: {
          100: "#E5F2E9",
          200: "#EEEEEE",
          300: "#B0D7BD",
          400: "#96C9A7",
          500: "#7CBC91",
          600: "#61AE7B",
          700: "#4E9968",
          800: "#575757",
          900: "##575757",
          950: "#396F4B",
          1000: "#315F41",
          1150: "#294F36",
          1200: "#21402B",
          1300: "#183020",
          1350: "#102016",
          1400: "#08100B",
        },
        muted: {
          100: "#FFFFFF",
          200: "#F9F9F9",
          300: "#E1E1E1",
          400: "#EDEDED",
          500: "#CBCBCB",
          600: "#ADADAD",
          700: "#757575",
          800: "#717171",
          900: "#353535",
          950: "#0C0C0C",
        },
        error: {
          100: "#FFF2F2",
          200: "#ED2E2E",
          300: "#C30000",
        },
        success: {
          100: "#F3FDFA",
          200: "#00BA88",
          300: "#00966D",
        },
        warning: {
          100: "#FFF8E1",
          200: "#F4B740",
          300: "#A9791C",
        },
      },

      borderRadius: {
        4: "4px",
        8: "8px",
        16: "16px",
        24: "24px",
        32: "32px",
        64: "64px",
      },

      fontFamily: {
        estedad: ["var(--font-estedad)"],
      },

      keyframes: {
        skeleton_animate: {
          from: {
            backgroundColor: "#F9F9F9",
          },
          to: {
            backgroundColor: "#CBCBCB",
          },
        },
      },
      animation: {
        skeleton_loading: "skeleton_animate 0.9s linear infinite alternate",
      },
    },
  },
  plugins: [],
};
