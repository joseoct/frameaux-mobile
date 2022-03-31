import React, { useEffect, useState } from 'react';
import { Button, Div, Icon, Text } from 'react-native-magnus';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../services/api';
import { Header } from '../components/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface RouteParams {
  technologyId: string;
  technologyName: string;
}

interface Technology {
  id: string;
  name: string;
  technology_image: string;
}

export default function VerifyLevel() {

  const routes = useRoute();
  const navigation = useNavigation();

  const { technologyId, technologyName } = routes.params as RouteParams;

  return (
    <>
      <Header title="Verificar nível em:" subtitle={technologyName} />

      <Div flex={1} justifyContent="center" alignItems="center">
        <TouchableOpacity onPress={() => navigation.navigate("Topics", {
          technologyId,
          technologyName,
        })}>
          <Div maxW={320} row borderWidth={1} borderColor="gray700" p={8}>
            <Icon m={16} name="chalkboard-teacher" color="green500" fontSize={24} fontFamily="FontAwesome5"/>

            <Text
              style={{
                flexShrink: 1,
                flexWrap: 'wrap',
              }}
              fontSize={32}
            >
              Quero começar do zero !
            </Text>
          </Div>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 16 }} onPress={() => console.log('oi')}>
          <Div maxW={320} row borderWidth={1} borderColor="gray700" p={8}>
            <Icon m={16} name="check" color="green500" fontSize={24} fontFamily="FontAwesome"/>

            <Text
              style={{
                flexShrink: 1,
                flexWrap: 'wrap',
              }}
              fontSize={32}
            >
              Já possuo algum conhecimento em {technologyName}
            </Text>
          </Div>
        </TouchableOpacity>

      </Div>
    </>
  );
}
