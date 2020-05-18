import styled from 'styled-components/native';

export default styled.Text`
  font-family: 'Montserrat-Bold';
  color: #7159c1;
  font-size: ${({ fontSize }) => fontSize || '22px'};
  margin-bottom: ${({ marginBottom }) => marginBottom || '50px'};
`;
