const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
// const { ngCreateGlobPatternsForDependencies: createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');

module.exports = {
  // , ngCreateGlobPatternsForDependencies(__dirname)
  purge: [createGlobPatternsForDependencies(__dirname)],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
