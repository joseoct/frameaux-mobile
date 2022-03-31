import React, { useEffect, useState } from 'react';
import { Div, Text } from 'react-native-magnus';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../services/api';
import { Header } from '../components/Header';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

interface RouteParams {
  technologyId: string;
  technologyName: string;
}

interface Topic {
  id: string;
  name: string;
}

export default function Topics() {

  const routes = useRoute();
  const navigation = useNavigation();

  const { technologyId, technologyName } = routes.params as RouteParams;

  const [topicsLayered, setTopicsLayered] = useState([]);

  useEffect(() => {
    async function loadTopics() {

      const { data: topicsLayered } = await api.get(`/technologies/${technologyId}/topics`);

      setTopicsLayered(topicsLayered);
    }

    loadTopics();
  }, []);

  return (
    <>
      <Header title="Tópicos de" subtitle={technologyName} />

      <Div flex={1}>
        <FlatList
          data={topicsLayered}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item: topics }) => (
            <Div alignItems="center">
              <Div row>
                {topics.map((topic: Topic) => (
                  <TouchableOpacity key={topic.id}>
                    <Div
                      alignItems="center"
                      justifyContent="center"
                      w={100}
                      h={100}
                      bg="gray800"
                      rounded="circle"
                      key={topic.id}
                      my={16}
                      mx={8}
                    >
                      <Text>{topic.name}</Text>
                    </Div>
                  </TouchableOpacity>
                ))}
              </Div>
            </Div>
          )}
        />

        {/* {topicsLayered.map((topics, index) => (
          <Div row key={index}>
            {topics.map((topic, index) => (
              <Div
                alignItems="center"
                justifyContent="center"
                w={100}
                h={100}
                bg="gray800"
                rounded="circle"
                key={index}
                m={16}
              >
                <Text>{topic.name}</Text>
              </Div>
            ))}
          </Div>
        ))} */}
      </Div>
    </>
  );
}
