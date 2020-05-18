import React, { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

import Container from '~/components/Container';
import Button from '~/components/Button';
import Title from '~/components/Title';

import Logo from '~/assets/images/Logo.png';
import Bottom from '~/assets/images/Bottom.png';

import { Content, LogoImage, SubTitle, FormInput, BgImage } from './styles';

export default function SignUp() {
  const [keyboardOpened, setKeyboardOpened] = useState(false);

  const handleKeyboardShow = () => {
    setKeyboardOpened(true);
  };

  const handleKeyboardHide = () => {
    setKeyboardOpened(false);
  };

  useEffect(() => {
    const keyUpSub = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardShow
    );
    const keyDownSub = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide
    );

    return () => {
      keyUpSub.remove();
      keyDownSub.remove();
    };
  }, []);

  return (
    <Container>
      <Content keyboardOpened={keyboardOpened}>
        <LogoImage source={Logo} keyboardOpened={keyboardOpened} />

        <Title fontSize="28px" marginBottom="10px">
          Bem-vindo!
        </Title>

        <SubTitle style={{ marginBottom: 0 }}>Por favor,</SubTitle>
        <SubTitle>preencha seus dados.</SubTitle>

        <FormInput IconName="person" placeholder="Nome completo" />
        <FormInput
          placeholder="Email"
          IconName="email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormInput
          IconName="vpn-key"
          secureTextEntry
          autoCapitalize="none"
          placeholder="Senha"
        />

        <Button>Cadastrar</Button>
      </Content>
      <BgImage source={Bottom} />
    </Container>
  );
}
