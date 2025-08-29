module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:vue/strongly-recommended", // 升级到更严格的Vue规则
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
    ecmaVersion: 2021,
    sourceType: "module",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // Vue相关规则
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "vue/no-unused-vars": "error",
    "vue/require-default-prop": "error",
    "vue/require-prop-types": "error",
    // JavaScript最佳实践
    "no-unused-vars": "warn",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-arrow-callback": "error",
    "no-trailing-spaces": "error",
    "eol-last": "error",
  },
};
