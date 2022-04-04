import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['NativeBase:']);
const _console = _.clone(console);
console.warn = message => {
if (message.indexOf('Setting a timer') <= -1) {
   _console.warn(message);
   }
};

import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';

import { QueryClientProvider } from 'react-query';
import { queryClient } from './src/services/queryClient';

import { theme } from '././src/global/theme';

import { NativeBaseProvider } from 'native-base';

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
        backgroundColor="#18181b"
        translucent
      />

      <QueryClientProvider client={queryClient}>
          <NativeBaseProvider theme={theme}>
            <AppProvider>
              <Routes />
            </AppProvider>
          </NativeBaseProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;
