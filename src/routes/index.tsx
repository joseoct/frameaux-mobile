import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../screens/SignIn';
import Dashboard from '../screens/Dashboard';

export type RootStackParamList = {
  SignIn: undefined;
  Dashboard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Routes: React.FC = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'Roboto_500Medium',
        },
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: '#1F2029' },
        }}
      />

      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: '#1A202C' },
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
