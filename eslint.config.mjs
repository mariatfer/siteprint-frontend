// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import prettierPlugin from 'eslint-plugin-prettier'

export default withNuxt({
  rules: {
    'vue/html-self-closing': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    'prettier/prettier': ['error'],
  },
  plugins: {
    prettier: prettierPlugin,
  },
})
