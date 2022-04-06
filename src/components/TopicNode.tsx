import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Button, Box,Icon, Text, VStack, HStack, Divider, useToast, View } from 'native-base';
import { Popover, usePopover } from 'react-native-modal-popover';

import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { api } from '../services/api';

interface TopicNodeProps {
  topic: {
    id: string;
    name: string;
    layer: number;
    explanation: string;
    UserTopic: {
      current_difficulty: number;
    }[];
  };
  studentTechnology?: {
    current_layer: number;
  };
}

export function TopicNode({
  topic,
  studentTechnology,
}: TopicNodeProps) {
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
      <TouchableOpacity
        disabled={
          studentTechnology &&
          Math.floor(topic.layer) > studentTechnology?.current_layer
        }
        ref={touchableRef}
        onPress={() => openPopover()}
      >
        <AnimatedCircularProgress
          size={120}
          width={8}
          fill={
            topic.UserTopic[0]?.current_difficulty
              ? ((topic.UserTopic[0].current_difficulty - 1) / 3) * 100
              : 0
          }
          rotation={135}
          tintColor={
            topic.UserTopic[0]?.current_difficulty === 4 ? '#947e03' : '#3fb134'
          }
          backgroundColor="#E5E5E5"
        >
          {() => (
            <Box
              alignItems="center"
              justifyContent="center"
              bg={
                topic.UserTopic[0]?.current_difficulty
                  ? `level.${topic.UserTopic[0]?.current_difficulty}`
                  : 'level.0'
              }
              width={85}
              height={85}
              rounded="full"
            >
              <Text color="dark.100" fontWeight="700">
                {topic.name}
              </Text>
            </Box>
          )}
        </AnimatedCircularProgress>

        {topic.UserTopic[0]?.current_difficulty > 1 && (
          <View position="absolute" left={85} top={68}>
            <FontAwesome5 name="crown" size={32} color="#ffcc00" />
            <Text
              textAlign="center"
              color="dark.200"
              fontWeight="bold"
              position="absolute"
              right={4}
              top={2}
            >
              {topic.UserTopic[0].current_difficulty - 1}
            </Text>
          </View>
        )}
      </TouchableOpacity>

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

          <Button
            onPress={() =>
              navigator.navigate('Explanation', {
                topic,
              })
            }
            colorScheme="blue"
            variant="link"
          >
            Explicação
          </Button>
          <Button
            _text={{
              color: 'gray.300',
            }}
            onPress={
              topic.UserTopic[0]?.current_difficulty > 0
                ? handleGoToExercises
                : handleCreateStudentTopic
            }
          >
            {topic.UserTopic[0]?.current_difficulty === 4
              ? 'Revisar tópico'
              : topic.UserTopic[0]?.current_difficulty
              ? 'Continuar praticando'
              : 'Começar tópico !'}
          </Button>
        </VStack>
      </Popover>
    </>
  );
}
