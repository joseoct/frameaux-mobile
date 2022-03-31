import React, { useEffect, useState } from 'react';
import { Div, Text, Image, Button } from 'react-native-magnus';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';

import api from '../services/api';
import { Header } from '../components/Header';

type Technology = {
  id: string;
  name: string;
  technology_image: string;
}

export default function Dashboard() {
  const { user, signOut } = useAuth();

  const navigation = useNavigation();

  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [userTechnologies, setUserTechnologies] = useState<Technology[]>([]);

  useEffect(() => {
    async function getTechnologies() {
      const { data: technologies } = await api.get('/technologies');

      const { data: userTechnologies } = await api.get('/user/technologies');

      setTechnologies(technologies);
      setUserTechnologies(userTechnologies);
    }

    getTechnologies();
  }, []);

  return (
    <>
      <Header title="Bem vindo," subtitle={user.name} icon="log-out"/>

      {userTechnologies.length > 0 && (
        <Div>
          <Div alignItems="center">
            <Text>Suas tecnologias</Text>
          </Div>

          <Div row m="xl">
            <FlatList
              horizontal
              data={userTechnologies}
              keyExtractor={(technology) => technology.id}
              renderItem={({ item: technology }) => (
                <Div
                  borderColor="gray300"
                  borderWidth={1}
                  p={16}
                  mx={2}
                  key={technology.id}
                >
                  <Image
                    h={70}
                    w={70}
                    m={10}
                    source={{
                      uri: technology.technology_image,
                    }}
                  />
                  <Text textAlign="center">{technology.name}</Text>
                </Div>
              )}
            ></FlatList>
          </Div>
        </Div>
      )}

      <Div mt={16}>
        <Div alignItems="center">
          <Text>Tecnologias para você aprender!</Text>
        </Div>

        <Div row m="xl">
          <FlatList
            data={technologies}
            keyExtractor={(technology) => technology.id}
            renderItem={({ item: technology }) => (
              <TouchableOpacity onPress={() => navigation.navigate('VerifyLevel', {
                technologyId: technology.id,
                technologyName: technology.name,
              })}>
                <Div
                  row
                  borderColor="gray700"
                  borderWidth={1}
                  p={8}
                  mb={12}
                  key={technology.id}
                >
                  <Image
                    h={20}
                    w={20}
                    m={10}
                    source={{
                      uri: technology.technology_image,
                    }}
                  />
                  <Text>{technology.name}</Text>
                </Div>
              </TouchableOpacity>
            )}
          />
        </Div>
      </Div>
    </>
  );
}
