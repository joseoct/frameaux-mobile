import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './index';

import Dashboard from '../screens/Dashboard';
import VerifyLevel from '../screens/VerifyLevel';
import Topics from '../screens/Topics';
import Exercises from '../screens/Exercises';
import Explanation from '../screens/Explanation';

export type AppStackParamList = {
  Dashboard: undefined;
};

const App = createStackNavigator<RootStackParamList>();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: "#18181B" },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="VerifyLevel" component={VerifyLevel} />
    <App.Screen name="Topics" component={Topics} />
    <App.Screen name="Exercises" component={Exercises} />
    <App.Screen name="Explanation" component={Explanation} />

  </App.Navigator>
);

export default AppRoutes;
