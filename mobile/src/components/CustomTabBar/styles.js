import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const CustomTouchable = styled(TouchableOpacity)`
  flex: 1;
  justify-content: center;
  padding-left: ${({ index, quarter }) =>
    index === 0 ? quarter : quarter * 2}px;
`;
