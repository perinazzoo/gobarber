import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export const Button = styled(LinearGradient).attrs({
  colors: ['#8274DA', '#572F95'],
})`
  flex: 1;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 2;
  elevation: 3;
  bottom: 20px;
  left: ${({ screenWidth }) => screenWidth / 2 - 30}px;
`;
