import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 50px 0 30px;
`;

export const DateButton = styled.TouchableOpacity`
  padding: 0 15px;
  height: 46px;
  background-color: #e6e6ff;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: #9583d1;
  margin-left: 10px;
  font-family: 'Montserrat-SemiBold';
`;

export const Picker = styled.View`
  background-color: #fff;
  padding: 15px 30px;
  margin-top: 30px;
`;
