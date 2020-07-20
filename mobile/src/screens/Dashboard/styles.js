import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' && 'padding',
})`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  padding-top: 30px;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: { paddingBottom: 10, paddingTop: 40 },
})``;
