import React, { useRef } from 'react';

import Container from '~/components/Container';
import Button from '~/components/Button';
import Title from '~/components/Title';
import BgImage from '~/components/BackgroundImage';

import { SubTitle, FormInput } from './styles';

export default function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <>
      <Container>
        <Title fontSize="28px" marginBottom="10px">
          Bem-vindo!
        </Title>

        <SubTitle style={{ marginBottom: 0 }}>Por favor,</SubTitle>
        <SubTitle>preencha seus dados.</SubTitle>

        <FormInput
          IconName="person"
          placeholder="Nome completo"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current.focus()}
          blurOnSubmit={false}
        />
        <FormInput
          ref={emailRef}
          placeholder="Email"
          IconName="email"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          blurOnSubmit={false}
        />
        <FormInput
          ref={passwordRef}
          IconName="vpn-key"
          secureTextEntry
          autoCapitalize="none"
          placeholder="Senha"
          returnKeyType="send"
        />

        <Button>Cadastrar</Button>
        <BgImage />
      </Container>
    </>
  );
}
