import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MagnusProvider } from 'react-native-magnus';
import theme from './src/global/styles/theme';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import Routes from './src/routes';

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
          <View style={{ backgroundColor: '#312e38', flex: 1 }}>
            <Routes />
          </View>
        </ThemeProvider>
      </MagnusProvider>
    </NavigationContainer>
  );
};

export default App;
