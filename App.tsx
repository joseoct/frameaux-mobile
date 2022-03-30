import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MagnusProvider } from 'react-native-magnus';
import theme from './src/global/styles/theme';
import Toast from 'react-native-toast-message';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import Routes from './src/routes';
import AppProvider from './src/hooks';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#312e38"
        translucent
      />

      <MagnusProvider>
        <ThemeProvider theme={theme}>
          <AppProvider>
            <View style={{ backgroundColor: '#312e38', flex: 1 }}>
              <Routes />
              <Toast />
            </View>
          </AppProvider>
        </ThemeProvider>
      </MagnusProvider>
    </NavigationContainer>
  );
};

export default App;
