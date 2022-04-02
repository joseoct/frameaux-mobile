import React from 'react';
import { TextInputProps } from 'react-native';
 
import { Control, Controller } from 'react-hook-form';
import { Input, Icon, Stack, Text} from 'native-base';
import { Feather } from '@expo/vector-icons'; 

interface InputFormProps extends TextInputProps {
  control: Control;
  name: string;
  placeholder: string;
  icon?: keyof typeof Feather.glyphMap;
  error?: string;
  secure?: boolean;
}

export default function InputForm({
  control,
  name,
  placeholder,
  icon,
  error,
  secure,
  ...rest
}: InputFormProps) {
  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            secureTextEntry={secure}
            color="gray.300"
            placeholder={placeholder}
            _focus={{
              borderColor: 'purple.400',
            }}
            p={3}
            borderWidth={2}
            borderColor={error ? 'red.500' : 'gray.500'}
            placeholderTextColor="gray.500"
            fontSize={16}
            onChangeText={onChange}
            value={value}
            {...rest}
            InputRightElement={
              <Icon
                as={<Feather name={icon} />}
                size={5}
                mr="2"
                color="gray.500"
              />
            }
          />
        )}
        name={name}
      />

      {error && (
        <Stack ml={2}>
          <Text color="red.400">{error}</Text>
        </Stack>
      )}
    </>
  );
}
