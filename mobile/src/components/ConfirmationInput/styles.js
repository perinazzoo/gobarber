import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  width: 100%;
  height: 46px;
  background-color: #e6e6ff;
  border-radius: 4px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const InputText = styled.Text`
  font-size: 14px;
  color: #9583d1;
  font-family: 'Montserrat-SemiBold';
  text-align: center;
  flex: 1;
  margin-left: 10px;
`;

export const IconContainer = styled(TouchableOpacity)`
  padding: 0 10px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
