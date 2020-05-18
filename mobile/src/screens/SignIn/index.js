import React, { useRef } from 'react';

import Title from '~/components/Title';
import Container from '~/components/Container';
import Button from '~/components/Button';
import BgImage from '~/components/BackgroundImage';

import { SubTitle, FormInput } from './styles';

export default function SignIn() {
  const passwordRef = useRef(null);

  return (
    <>
      <Container>
        <Title marginBottom="20px" fontSize="28px">
          Olá novamente!
        </Title>

        <SubTitle style={{ marginBottom: 0 }}>Por favor,</SubTitle>
        <SubTitle>preencha suas credenciais.</SubTitle>

        <FormInput
          autoFocus
          IconName="email"
          placeholder="Email"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          blurOnSubmit={false}
        />
        <FormInput
          IconName="vpn-key"
          placeholder="Senha"
          ref={passwordRef}
          returnKeyType="send"
        />

        <Button>Entrar</Button>
        <BgImage />
      </Container>
    </>
  );
}
