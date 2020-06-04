import styled from 'styled-components/native';
import { Platform } from 'react-native';
import Input from '~/components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' && 'padding',
})`
  flex: 1;
  background-color: #fff;
  padding: 20px 35px 0;
`;

export const FormInput = styled(Input)`
  margin-bottom: 20px;
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: #e6e6ff;
  margin-bottom: 20px;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  concentContainerStyle: { padding: 30 },
})``;
