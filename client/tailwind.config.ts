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
        primary: {
          ...colors.fuchsia,
          DEFAULT: colors.fuchsia[600],
        },
        dark: {
          body: colors.gray[900],
          DEFAULT: colors.gray[800],
        },
        error: "var(--color-error)",
        success: "var(--color-success)",
        info: "var(--color-info)",
        warning: "var(--color-warning)",
      },
    },
  },
  plugins: [forms, daisyui],
  daisyui: {
    themes: [
      {
        dark: {
          ...daisyuiThemes["dark"],
          primary: colors.fuchsia[600],
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
