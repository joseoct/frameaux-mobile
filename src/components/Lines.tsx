import React from 'react'
import { VStack, Divider, HStack, Button } from 'native-base'

interface LinesProps {
  userAnswer: string[]
  handleOnSubToSequency: (answer: string) => void
}

export default function Lines({ userAnswer, handleOnSubToSequency }: LinesProps) {
  return (
    <VStack my={4}>
      <Divider bg="gray.600"/>
      <HStack position="absolute">
        <Button.Group
          colorScheme="purple"
          w="100%"
          direction="row"
        >
          {userAnswer.map((answer, index) => (
            <Button onPress={() => handleOnSubToSequency(answer)} key={index}>
              {answer}
            </Button>
          ))}
        </Button.Group>
      </HStack>
      <Divider bg="gray.600" mt={10}/>
      <Divider bg="gray.600" mt={10}/>
    </VStack>
  );
}
