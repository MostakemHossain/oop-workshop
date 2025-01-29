import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from "globals";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  eslintPluginPrettierRecommended,
  {
    rules:{
      "no-unused-vars": "error",
    }
  },
  {
    ignores: [".node_modules/*","dist"]
  },
  {
    globals:{
      process:"readonly",
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

];