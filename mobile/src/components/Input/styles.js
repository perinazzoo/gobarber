import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 46px;
  background-color: #e6e6ff;
  border-radius: 4px;
  padding: 0 12px;

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: '#9583D1',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #9583d1;

  font-family: 'Montserrat-SemiBold';
`;
