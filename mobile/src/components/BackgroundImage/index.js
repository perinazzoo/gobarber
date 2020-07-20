import styled from 'styled-components/native';

import Bottom from '~/assets/images/Bottom.png';

const BgImage = styled.Image.attrs({
  source: Bottom,
})`
  width: 100%;
  z-index: 0;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export default BgImage;
