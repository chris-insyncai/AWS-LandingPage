const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.html', './src/**/*.js'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {
      screens: {
        '2xl': '1536px',
      },
      colors: {
        'fossil-1': '#2B2E40',
        'fossil-2': '#DAE8EF',
        'fossil-3': '#A2BEEF',
        'fossil-4': '#4678A7',
        'fossil-5': '#3A5373',
        mint: '#7AFEA3',
        coral: '#FE5B78',
        'acc-eye': '#DFFC6A',
        'acc-aqua': '#02B8FC',
        'acc-fuchsia': '#FE2E88',
      },
      fontFamily: {
        header: 'CircularXX Bold',
        body: 'CircularXX',
        thin: 'CircularXX Thin',
        light: 'CircularXX Light',
        medium: 'CircularXX Medium',
        bold: 'CircularXX Medium',
        black: 'CircularXX Black',
        xblack: 'CircularXX ExtraBlack',
      },
      fontSize: {
        h1: '9.6rem',
        h2: '4rem',
        h3: '3rem',
        h4: '2rem',
        24: '2.4rem',
        16: '1.6rem',
        14: '1.4rem',
      },
      minHeight: {
        720: '720px',
      },
      height: {
        56: '56px',
      },
      width: {
        56: '56px',
      },
      inset: {
        slight: '10%',
      },
      rotate: {
        135: '-135deg',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, config }) {
      addBase({
        a: {
          textDecoration: 'none',
          transition: '0.4s ease',
        },
        'a:hover': {
          color: config('theme.textColor.coral'),
        },
        'h1, h2, h3, h4, h5': {
          lineHeight: config('theme.lineHeight.tight'),
          fontFamily: config('theme.fontFamily.header'),
        },
        h4: {
          fontFamily: config('theme.fontFamily.medium'),
        },
        h5: { fontSize: config('theme.fontSize.xl') },
      });
    }),
  ],
};
