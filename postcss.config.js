module.exports = {
  plugins: {
    tailwindcss: { config: [
      './apps/react-todo/tailwind.config.js',
      './apps/ng-todo/tailwind.config.js'
    ] },
    autoprefixer: {},
  },
};
