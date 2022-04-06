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
      <HStack mt={1} position="absolute">
        <Button.Group
          colorScheme="purple"
          w="100%"
          direction="row"
        >
          {userAnswer.map((answer, index) => (
            <Button _text={{
              color: 'gray.300',
            }} onPress={() => handleOnSubToSequency(answer)} key={index}>
              {answer}
            </Button>
          ))}
        </Button.Group>
      </HStack>
      <Divider bg="gray.600" mt={16}/>
      <Divider bg="gray.600" mt={16}/>
    </VStack>
  );
}
