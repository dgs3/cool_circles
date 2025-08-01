// eslint.config.js

import js from '@eslint/js';

export default [
  js.configs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // fxhash globals
        fxhash: 'readonly',
        fxrand: 'readonly',
        fxpreview: 'readonly',
        $fx: 'readonly',

        // p5.js or sketch globals
        setup: 'readonly',
        draw: 'readonly',
        createCanvas: 'readonly',
        background: 'readonly',
        windowWidth: 'readonly',
        windowHeight: 'readonly',
        noLoop: 'readonly',

        // browser globals
        window: 'readonly',
        document: 'readonly',
        requestAnimationFrame: 'readonly',
        console: 'readonly',
        Image: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'eqeqeq': ['warn', 'always']
    }
  }
];

