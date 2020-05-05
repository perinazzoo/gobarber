import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { useSelector, useDispatch } from 'react-redux';

import CustomInput from '~/components/CustomInput';
import AvatarInput from './components/AvatarInput';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import { Container } from './styles';

export default function Profile() {
  const formRef = useRef();
  const dispatch = useDispatch();
  const profile = useSelector(({ user }) => user);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));

    formRef.current.setFieldValue('oldPassword', '');
    formRef.current.setFieldValue('password', '');
    formRef.current.setFieldValue('confirmPassword', '');
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={profile}>
        <h2>Atualize seu perfil</h2>

        <AvatarInput name="avatar_id" />

        <div>
          <CustomInput
            label="Nome completo"
            name="name"
            type="text"
            placeholder=" "
          />
        </div>

        <div>
          <CustomInput
            label="Email"
            name="email"
            type="email"
            placeholder=" "
          />
        </div>

        <hr />

        <div>
          <CustomInput
            label="Senha atual"
            name="oldPassword"
            type="password"
            placeholder=" "
          />
        </div>

        <div>
          <CustomInput
            label="Senha"
            name="password"
            type="password"
            placeholder=" "
          />
        </div>

        <div>
          <CustomInput
            label="Confirmar senha"
            name="confirmPassword"
            type="password"
            placeholder=" "
          />
        </div>

        <button type="submit">Atualizar</button>

        <button type="button" onClick={handleLogout}>
          Sair
        </button>
      </Form>
    </Container>
  );
}
