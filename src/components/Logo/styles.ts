import styled from 'styled-components/native';

export const FirstName = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const SecondName = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.purple[400]};
  font-family: ${({ theme }) => theme.fonts.medium};
`;
