import daisyui from "daisyui";
import daisyuiThemes from "daisyui/src/theming/themes";
import colors from "tailwindcss/colors";
import { Config } from "tailwindcss/types/config";
import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionDuration: { DEFAULT: "300ms" },
      colors: {
        primary: colors.violet,
        dark: {
          body: "#1a1a1a",
          DEFAULT: "#242424",
          pure: "#101010",
        },
        error: "#B00020",
        success: "#008B00",
        info: "#0ea5e9",
        warning: "#ffd600",
      },
    },
  },
  plugins: [forms, daisyui],
  daisyui: {
    themes: [
      {
        dark: {
          ...daisyuiThemes["[data-theme=dark]"],
          primary: colors.violet[600],
          "primary-content": "fff",
          error: "#B00020",
          success: "#008B00",
          info: "#0ea5e9",
          warning: "#ffd600",
        },
      },
    ],
  },
} satisfies Config;
