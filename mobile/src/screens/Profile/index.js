import React, { useState, useRef, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Title from '~/components/Title';
import Button from '~/components/Button';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import { Container, FormInput, Form, Line } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState((user && user.name) || '');
  const [email, setEmail] = useState((user && user.email) || '');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [opened, setOpened] = useState(false);

  function keyShow() {
    setOpened(true);
  }

  function keyHide() {
    setOpened(false);
  }

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }

  function handleLogout() {
    dispatch(signOut());
  }

  useEffect(() => {
    const openSub = Keyboard.addListener('keyboardDidShow', keyShow);
    const closeSub = Keyboard.addListener('keyboardDidHide', keyHide);

    return () => {
      closeSub.remove();
      openSub.remove();
    };
  }, []);

  useEffect(() => {
    setPassword('');
    setOldPassword('');
    setConfirmPassword('');
  }, [user]);

  return (
    <Container>
      <Title style={{ alignSelf: 'center' }}>Atualizar Perfil</Title>
      <Form>
        <FormInput
          IconName="person"
          placeholder="Nome completo"
          value={name}
          onChangeText={setName}
          onSubmitEditing={() => emailRef.current.focus()}
          blurOnSubmit={false}
          returnKeyType="next"
        />
        <FormInput
          keyboardType="email-address"
          ref={emailRef}
          IconName="email"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={() => oldPasswordRef.current.focus()}
          blurOnSubmit={false}
          returnKeyType="next"
        />

        <Line />

        <FormInput
          ref={oldPasswordRef}
          IconName="vpn-key"
          placeholder="Senha atual"
          value={oldPassword}
          onChangeText={setOldPassword}
          onSubmitEditing={() => passwordRef.current.focus()}
          blurOnSubmit={false}
          returnKeyType="next"
          secureTextEntry
        />
        <FormInput
          ref={passwordRef}
          IconName="vpn-key"
          placeholder="Nova senha"
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
          blurOnSubmit={false}
          returnKeyType="next"
          secureTextEntry
        />
        <FormInput
          ref={confirmPasswordRef}
          IconName="vpn-key"
          placeholder="Confirmar nova senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          returnKeyType="send"
          secureTextEntry
        />
        {!opened && (
          <>
            <Button style={{ marginBottom: 10 }} onPress={handleSubmit}>
              Salvar alterações
            </Button>
            <Button bgColor="#FF637E" onPress={handleLogout}>
              Sair da conta
            </Button>
          </>
        )}
      </Form>
    </Container>
  );
}
