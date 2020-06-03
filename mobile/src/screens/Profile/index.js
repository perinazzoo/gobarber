import React, { useState } from 'react';

import Container from '~/components/Container';
import Title from '~/components/Title';

import { FormInput } from './styles';

export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <Container>
      <Title style={{ alignSelf: 'center' }}>Atualizar Perfil</Title>

      <FormInput
        IconName="person"
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
      />
      <FormInput
        IconName="email"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <FormInput
        IconName="vpn-key"
        placeholder="Senha atual"
        value={password}
        onChangeText={setPassword}
      />
      <FormInput
        IconName="vpn-key"
        placeholder="Nova senha"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <FormInput
        IconName="vpn-key"
        placeholder="Confirmar nova senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
    </Container>
  );
}
