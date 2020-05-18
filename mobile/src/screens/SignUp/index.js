import React from 'react';

import Container from '~/components/Container';
import Button from '~/components/Button';
import Title from '~/components/Title';
import BgImage from '~/components/BackgroundImage';

import { SubTitle, FormInput } from './styles';

export default function SignUp() {
  return (
    <>
      <Container>
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
        <BgImage />
      </Container>
    </>
  );
}
