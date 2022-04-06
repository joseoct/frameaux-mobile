import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Topic } from '../screens/Topics';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

import { useAuth } from '../hooks/auth';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;

  Dashboard: undefined;
  VerifyLevel: { technologyId: string; technologyName: string, technologyImage: string };
  Topics: { technologyId: string; technologyName: string, technologyImage: string };
  Exercises: { topicId: string, difficulty: number };
  Explanation: { topic: Topic };
};

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
