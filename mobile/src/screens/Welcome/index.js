import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Container from '~/components/Container';
import BgImage from '~/components/BackgroundImage';

import Logo from '~/assets/images/Logo.png';

import { LogoImage, SignUpButton, SignInButton, ButtonBorder } from './styles';

export default function Welcome() {
  const { navigate } = useNavigation();

  return (
    <Container>
      <LogoImage source={Logo} />
      <SignUpButton onPress={() => navigate('signup')}>
        Quero me cadastrar
      </SignUpButton>
      <ButtonBorder />
      <SignInButton textColor="#7159c1" onPress={() => navigate('signin')}>
        Já tenho uma conta
      </SignInButton>
      <BgImage />
    </Container>
  );
}
