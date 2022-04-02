import { extendTheme } from 'native-base';

export const theme = extendTheme({
  fontConfig: {
    Roboto: {
      400: {
        normal: 'Roboto_400Regular',
      },
      500: {
        normal: 'Roboto_500Medium',
      },
      700: {
        normal: 'Roboto_700Bold',
      },
    },
  },

  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular',
    mono: 'Roboto_500Medium',
  },

  components: {
    Heading: {
      defaultProps: {
        color: 'gray.300',
      },
    },
    Text: {
      defaultProps: {
        fontFamily: 'body',
        color: 'gray.300',
      },
    },
    Button: {
      defaultProps: {
        _text: {
          fontFamily: 'heading',
          fontSize: 16,
        }
      },
    },
  },
});
