import React from 'react';
import { Button, HStack, Text, VStack } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';

interface RouteParams {
  text: string;
  layer: number;
}


export default function TestResult() {

  const routes = useRoute();
  const navigation = useNavigation();

  const { text, layer } = routes.params as RouteParams;

  return (
    <VStack space={8} flex={1} justifyContent="center" alignItems="center">
      <Text fontSize={20}>{text}</Text>

      <Text fontSize={24}>Você pulou para a camada {layer} !</Text>

      <Button variant="link" onPress={() => navigation.navigate("Dashboard")}>Voltar</Button>
    </VStack>
  )
}
