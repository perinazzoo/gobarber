import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

export const Content = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 2,
  contentContainerStyle: {
    marginTop: 50,
    paddingHorizontal: 25,
  },
})``;

export const Card = styled(RectButton)`
  flex: 1;
  height: 100px;
  background-color: #fff;
  border-radius: 12px;
  elevation: 5;

  margin: 0 10px 20px;
`;

export const Background = styled.ImageBackground`
  width: 100%;
  height: 100%;
  resize-mode: cover;
  justify-content: space-evenly;

  align-items: center;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border-width: 1px;
  border-color: #7159c1;
`;

export const Name = styled.Text`
  font-family: 'Montserrat-Bold';
  color: #7159c1;
  font-size: 14px;
`;
