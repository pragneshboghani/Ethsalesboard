/** @type { import('@storybook/react').Preview } */
// import { withThemeByClassName } from '@storybook/addon-themes';
import "./../src/index.css"

// export const decorators = [
//   withThemeByClassName({
//     themes: {
//       light: 'light',
//       dark: 'dark',
//     },
//     defaultTheme: 'light',
//     // attributeName: 'data-mode',
//   }),
// ];

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
