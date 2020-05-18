import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Title from '~/components/Title';
import Container from '~/components/Container';
import Button from '~/components/Button';
import BgImage from '~/components/BackgroundImage';

import { signInRequest } from '~/store/modules/auth/actions';

import { SubTitle, FormInput } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const passwordRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

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
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          blurOnSubmit={false}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <FormInput
          IconName="vpn-key"
          placeholder="Senha"
          ref={passwordRef}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
        />

        <Button onPress={handleSubmit} loading={loading}>
          Entrar
        </Button>
        <BgImage />
      </Container>
    </>
  );
}
