import React from 'react';
import { TextInputProps } from 'react-native';

import { Input, Icon, Div, Text } from 'react-native-magnus';
import { Control, Controller } from 'react-hook-form';

interface InputFormProps extends TextInputProps {
  control: Control;
  name: string;
  placeholder: string;
  icon?: string;
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
            mt="lg"
            secureTextEntry={secure}
            placeholder={placeholder}
            placeholderTextColor="gray300"
            fontSize={16}
            fontFamily="Roboto_500Medium"
            p={10}
            borderColor={error ? 'red400' : '#181b23'}
            focusBorderColor="purple500"
            borderWidth={2}
            bg="#181b23"
            color="white"
            onChangeText={onChange}
            value={value}
            {...rest}
            suffix={
              icon && (
                <Icon
                  name={icon}
                  fontSize={18}
                  color="gray300"
                  fontFamily="Feather"
                />
              )
            }
          />
        )}
        name={name}
      />

      {error && (
        <Div ml={8}>
          <Text color="red400">{error}</Text>
        </Div>
      )}
    </>
  );
}
