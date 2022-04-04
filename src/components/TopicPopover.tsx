import React from 'react';

import { Button, Icon, Text, VStack, HStack, Divider, useToast } from 'native-base';
import { Popover, usePopover } from 'react-native-modal-popover';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { api } from '../services/api';

interface TopicPopoverProps {
  topic: {
    id: string;
    name: string;
    layer: number;
    UserTopic: {
      current_difficulty: number;
    }[];
  };
  studentTechnology?: {
    current_layer: number;
  };
}

export function TopicPopover({
  topic,
  studentTechnology,
}: TopicPopoverProps) {
  const navigator = useNavigation();
  const toast = useToast();

  async function handleCreateStudentTopic() {
    try {
      await api.post(`/students-topics/${topic.id}`);

      navigator.navigate('Exercises', { topicId: topic.id, difficulty: 1 });
    } catch (error) {

      toast.show({
        title: 'Erro ao se conectar ao tópico',
        status: 'error',
      })
    }
  }

  function handleGoToExercises() {
    navigator.navigate('Exercises', {
      topicId: topic.id,
      difficulty: topic.UserTopic[0]?.current_difficulty,
    });
  }
  const {
    openPopover,
    closePopover,
    popoverVisible,
    touchableRef,
    popoverAnchorRect,
  } = usePopover();

  return (
    <>
      <Button
        onPress={() => openPopover()}
        ref={touchableRef}
        w={100}
        h={100}
        colorScheme="gray"
        bg={
          studentTechnology &&
          Math.floor(topic.layer) > studentTechnology?.current_layer
            ? 'gray.500'
            : 'gray.800'
        }
        disabled={
          studentTechnology &&
          Math.floor(topic.layer) > studentTechnology?.current_layer
        }
        rounded="full"
        variant="solid"
      >
        {topic.name}
      </Button>

      <Popover
        placement="top"
        visible={popoverVisible}
        onClose={closePopover}
        fromRect={popoverAnchorRect}
        supportedOrientations={['portrait', 'landscape']}
        backgroundStyle={{ backgroundColor: 'transparent' }}
      >
        <VStack alignItems="center" space={2}>
          <Text fontWeight={500} fontSize={16} color="dark.200">
            {topic.name}
          </Text>

          <Divider bg="purple.400" />

          <HStack>
            <Icon
              color={
                topic.UserTopic[0]?.current_difficulty > 1
                  ? 'yellow.500'
                  : 'dark.100'
              }
              as={
                <MaterialCommunityIcons name="crown"></MaterialCommunityIcons>
              }
            />
            <Icon
              color={
                topic.UserTopic[0]?.current_difficulty > 2
                  ? 'yellow.500'
                  : 'dark.100'
              }
              as={
                <MaterialCommunityIcons name="crown"></MaterialCommunityIcons>
              }
            />
            <Icon
              color={
                topic.UserTopic[0]?.current_difficulty > 3
                  ? 'yellow.500'
                  : 'dark.100'
              }
              as={
                <MaterialCommunityIcons name="crown"></MaterialCommunityIcons>
              }
            />
          </HStack>

          <Button colorScheme="blue" variant="link">
            Explicação
          </Button>
          <Button
            onPress={
              topic.UserTopic[0]?.current_difficulty > 0
                ? handleGoToExercises
                : handleCreateStudentTopic
            }
            _text={{
              color: 'gray.300',
            }}
            colorScheme="purple"
          >
            {topic.UserTopic[0]?.current_difficulty
              ? 'Continuar praticando'
              : 'Começar tópico !'}
          </Button>
        </VStack>
      </Popover>
    </>
  );
}
