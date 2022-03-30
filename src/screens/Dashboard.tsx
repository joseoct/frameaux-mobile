import React from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-magnus';
import { useAuth } from '../hooks/auth';

export default function Dashboard() {
  const { signOut } = useAuth();

  return (
    <>
      <Button onPress={() => signOut()}>Logout</Button>
    </>
  );
}
