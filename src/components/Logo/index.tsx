import React from 'react';
import { View } from 'react-native';
import { Div } from 'react-native-magnus';

import { FirstName, SecondName } from './styles';

export default function Logo() {
  return (
    <Div row mt={64} mb={8}>
      <FirstName>frame</FirstName>
      <SecondName>aux</SecondName>
    </Div>
  )
}
