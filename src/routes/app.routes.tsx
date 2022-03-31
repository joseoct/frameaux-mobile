import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './index';

import Dashboard from '../screens/Dashboard';
import VerifyLevel from '../screens/VerifyLevel';
import Topics from '../screens/Topics';

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
    <App.Screen name="VerifyLevel" component={VerifyLevel} />
    <App.Screen name="Topics" component={Topics} />

  </App.Navigator>
);

export default AppRoutes;
