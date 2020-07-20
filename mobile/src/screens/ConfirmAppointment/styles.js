import styled from 'styled-components/native';

export const Content = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 50px;
`;

export const ImageContainer = styled.View`
  elevation: 8;
  margin-bottom: 20px;
  border-radius: 60px;
`;

export const Image = styled.Image`
  width: 120px;
  height: 120px;
  border-width: 2px;
  border-color: #7159c1;
  resize-mode: cover;
  border-radius: 60px;
`;

export const Name = styled.Text`
  font-family: 'Montserrat-Bold';
  font-size: 22px;
  color: #7159c1;
  margin-bottom: 5px;
`;

export const Date = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-SemiBold';
  margin-bottom: 20px;
  color: #666;
`;
