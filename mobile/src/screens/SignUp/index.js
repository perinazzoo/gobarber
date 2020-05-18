import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '~/components/Container';
import Button from '~/components/Button';
import Title from '~/components/Title';
import BgImage from '~/components/BackgroundImage';

import { signUpRequest } from '~/store/modules/auth/actions';

import { SubTitle, FormInput } from './styles';

export default function SignUp() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleSumit() {
    dispatch(signUpRequest(name, email, password));
  }

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
          value={name}
          onChangeText={setName}
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
          value={email}
          onChangeText={setEmail}
        />
        <FormInput
          ref={passwordRef}
          IconName="vpn-key"
          secureTextEntry
          autoCapitalize="none"
          placeholder="Senha"
          returnKeyType="send"
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handleSumit}
        />

        <Button loading={loading} onPress={handleSumit}>
          Cadastrar
        </Button>
        <BgImage />
      </Container>
    </>
  );
}
