import styled from 'styled-components/native';

export const ListItem = styled.View`
  max-width: 100%;
  height: 76px;
  padding: 0 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #e6e6ff;
  border-radius: 4px;
  margin: 0 35px 25px;
  elevation: ${({ past }) => (past ? 0 : 2)};

  opacity: ${({ past }) => (past ? 0.6 : 1)};
`;

export const ProviderInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border-width: 2px;
  border-color: #7159c1;
`;

export const TextInfo = styled.View`
  margin-left: 10px;
`;

export const Name = styled.Text`
  font-size: 16px;
  color: #7159c1;
  font-family: 'Montserrat-SemiBold';
`;

export const Time = styled.Text`
  font-size: 12px;
  color: #666;
  font-family: 'Montserrat-Regular';
`;
