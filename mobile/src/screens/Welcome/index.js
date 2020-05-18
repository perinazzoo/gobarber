import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Container from '~/components/Container';
import BgImage from '~/components/BackgroundImage';

import Logo from '~/assets/images/Logo.png';

import { LogoImage, CustomText, CustomButton } from './styles';

export default function Welcome() {
  const { navigate } = useNavigation();

  return (
    <Container>
      <LogoImage source={Logo} />
      <CustomText>Olá, escolha uma das seguintes opções:</CustomText>
      <CustomButton onPress={() => navigate('signin')}>Entrar</CustomButton>
      <CustomText>OU</CustomText>
      <CustomButton onPress={() => navigate('signup')}>Cadastrar</CustomButton>
      <BgImage />
    </Container>
  );
}
