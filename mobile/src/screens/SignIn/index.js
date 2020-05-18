import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

import Title from '~/components/Title';
import Container from '~/components/Container';
import Button from '~/components/Button';

import Logo from '~/assets/images/Logo.png';
import BottomBg from '~/assets/images/Bottom.png';

import { Content, LogoImage, SubTitle, FormInput, BgImage } from './styles';

export default function SignIn() {
  const [keyboardOpened, setKeyboardOpened] = useState(false);

  const handleKeyboardHide = useCallback(() => {
    setKeyboardOpened(false);
  }, []);

  const handleKeyboardShow = useCallback(() => {
    setKeyboardOpened(true);
  }, []);

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
  }, [handleKeyboardHide, handleKeyboardShow]);

  return (
    <Container>
      <Content>
        <LogoImage source={Logo} keyboardOpened={keyboardOpened} />

        <Title marginBottom="20px" fontSize="28px">
          Olá novamente!
        </Title>

        <SubTitle style={{ marginBottom: 0 }}>Por favor,</SubTitle>
        <SubTitle>preencha suas credenciais.</SubTitle>

        <FormInput IconName="email" placeholder="Email" />
        <FormInput IconName="vpn-key" placeholder="Senha" />

        <Button>Entrar</Button>
      </Content>
      <BgImage source={BottomBg} />
    </Container>
  );
}
