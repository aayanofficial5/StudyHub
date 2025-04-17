import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { parse } from "espree"; // ✅ Default ESLint parser with JSX support
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      parser: parse,
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.browser,
      ecmaFeatures: {
        jsx: true, // ✅ Enable JSX support
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // ✅ No need to import React in every JSX file
    },
  },
]);
