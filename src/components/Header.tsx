import React from 'react';
import { Button, Div, Text, Icon } from 'react-native-magnus';
import { useAuth } from '../hooks/auth';

interface HeaderProps {
  title: string;
  subtitle: string;
  icon?: string;
}

export function Header({ title, subtitle, icon }: HeaderProps) {
  const { signOut } = useAuth();

  return (
    <Div p={24} pt={48} flexDir="column" justifyContent="center" bg="purple400">
      <Text>{title}</Text>
      <Div row justifyContent="space-between">
        <Text fontSize={32}>{subtitle}</Text>
        {icon && (
          <Button
            onPress={() => signOut()}
            bg="gray300"
            h={40}
            w={40}
            rounded="circle"
          >
            <Icon
              fontSize="2xl"
              name="log-out"
              color="purple400"
              fontFamily="Feather"
            />
          </Button>
        )}
      </Div>
    </Div>
  );
}
