import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import CustomInput from '~/components/CustomInput';
import api from '~/services/api';

import logo from '~/assets/logo.svg';

export default function SignIn() {
  const formRef = useRef(null);

  async function handleSubmit({ email, password }) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Insira um email válido')
          .required('O email é obrigatório'),
        password: Yup.string()
          .min(6, 'A senha precisa ter no mínimo 6 caracteres')
          .required('A senha é obrigatória'),
      });

      await schema.validate(
        { email, password },
        {
          abortEarly: false,
        }
      );

      const { data } = await api.post('/sessions', { email, password });
      console.log(data);
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <img src={logo} alt="Logo do GoBarber" />

        <div>
          <CustomInput
            label="Email"
            name="email"
            type="email"
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

        <button type="submit">Entrar</button>

        <div className="form-link">
          <Link to="/register">Ainda não tem uma conta?</Link>
        </div>
      </Form>
    </>
  );
}
