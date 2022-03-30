import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './index';

import Dashboard from '../screens/Dashboard';

export type AppStackParamList = {
  Dashboard: undefined;
};

const App = createStackNavigator<RootStackParamList>();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: "#1F2029" },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />

  </App.Navigator>
);

export default AppRoutes;
