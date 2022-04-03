import { Popover, Button, Icon } from "native-base";
import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { api } from "../services/api";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

interface TopicPopoverProps {
  topic: {
    id: string;
    name: string;
    layer: number;
    UserTopic: {
      current_difficulty: number;
    }[]
  },
  studentTechnology?: {
    current_layer: number;
  }
}

export default function TopicPopover({ topic, studentTechnology }: TopicPopoverProps) {

  const navigator = useNavigation();

  async function handleCreateStudentTopic() {
    try {
      await api.post(`/students-topics/${topic.id}`)

      navigator.navigate('Exercises', { topicId: topic.id, difficulty: 1 });
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Erro ao conectar ao tópico",
      })
    }
  }

  function handleGoToExercises() {
      navigator.navigate('Exercises', { topicId: topic.id, difficulty: topic.UserTopic[0]?.current_difficulty });
  }

  return (
    <Popover
      trigger={(triggerProps) => {
        return (
          <Button
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
            {...triggerProps}
          >
            {topic.name}
          </Button>
        );
      }}
    >
      <Popover.Content>
        <Popover.Arrow />
        <Popover.Header alignSelf="center">{topic.name}</Popover.Header>
        <Popover.Body mt={2} flexDirection="row" justifyContent="center">
          <Icon
            color={
              topic.UserTopic[0]?.current_difficulty > 1
                ? 'yellow.500'
                : 'dark.100'
            }
            as={<MaterialCommunityIcons name="crown"></MaterialCommunityIcons>}
          />
          <Icon
            color={
              topic.UserTopic[0]?.current_difficulty > 2
                ? 'yellow.500'
                : 'dark.100'
            }
            as={<MaterialCommunityIcons name="crown"></MaterialCommunityIcons>}
          />
          <Icon
            color={
              topic.UserTopic[0]?.current_difficulty > 3
                ? 'yellow.500'
                : 'dark.100'
            }
            as={<MaterialCommunityIcons name="crown"></MaterialCommunityIcons>}
          />
        </Popover.Body>
        <Popover.Footer justifyContent="flex-end">
          <Button.Group direction="column" space={2}>
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
                : 'Começar !'}
            </Button>
          </Button.Group>
        </Popover.Footer>
      </Popover.Content>
    </Popover>
  );
}
