import React from 'react';
import { HStack, VStack,Text, Icon, Image } from 'native-base';
import { useAuth } from '../hooks/auth';
import { Feather } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  subtitle: string;
  icon?: string;
  technologyImage?: string;
}

export function Header({ title, subtitle, icon, technologyImage }: HeaderProps) {
  const { signOut } = useAuth();

  return (
    <HStack p={8} pt={16} justifyContent="space-between" bg="purple.500">
      <VStack>
        <Text fontWeight={500}>{title}</Text>
        <Text fontSize={32} fontWeight={700}>
          {subtitle}
        </Text>
      </VStack>
      {technologyImage && (
        <Image
          h={16}
          w={16}
          alt="Ícone da tecnologia"
          source={{
            uri: technologyImage,
          }}
        />
      )}
      {icon && (
        <Icon
          mt={4}
          onPress={() => signOut()}
          color="gray.300"
          size={8}
          as={<Feather name="log-out" />}
        ></Icon>
      )}
    </HStack>
  );
}
