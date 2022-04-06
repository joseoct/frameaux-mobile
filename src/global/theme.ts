import { extendTheme } from 'native-base';

export const theme = extendTheme({

  colors: {
    level: {
      0: '#777777',
      1: '#66cc00',
      2: '#3399ff',
      3: '#ff3333',
      4: '#ffec00',
    }
  },

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
        padding: '16px',
        colorScheme: 'purple',
        _text: {
          // color: "gray.300",
          fontFamily: 'heading',
          fontSize: 16,
        }
      },
    },
  },
});
