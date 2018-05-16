module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "problems",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: "module"
  },
  plugins: ["react", "jsx-a11y", "prettier"],
  rules: {
    "linebreak-style": ["error", "unix"],
    semi: ["error", "always"],
    "prettier/prettier": "error",
    "no-console": 0,
    "react/prop-types": 0
  }
};
