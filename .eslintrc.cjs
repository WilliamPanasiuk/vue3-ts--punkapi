module.exports = {
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error',
    // 'vue/script-setup-uses-vars': 'off',
    // "no-unused-vars": "off",
    "vue/multi-word-component-names": "off",
  },
};
