import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

import CustomInput from '~/components/CustomInput';

import logo from '~/assets/logo.svg';

export default function SignUp() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const { loading } = useSelector(({ auth }) => auth);

  async function handleSubmit({ name, email, password }) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Insira um email válido')
          .required('O email é obrigatório'),
        password: Yup.string()
          .min(6, 'A senha precisa ter no mínimo 6 caracteres')
          .required('A senha é obrigatória'),
      });

      await schema.validate(
        { name, email, password },
        {
          abortEarly: false,
        }
      );

      dispatch(signUpRequest(name, email, password));
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
            label="Nome comleto"
            name="name"
            type="text"
            id="name"
            placeholder=" "
          />
        </div>

        <div>
          <CustomInput
            label="Email"
            name="email"
            type="email"
            id="email"
            placeholder=" "
          />
        </div>

        <div>
          <CustomInput
            label="Senha"
            name="password"
            type="password"
            id="pass"
            placeholder=" "
          />
        </div>

        <button type="submit">{loading ? 'Carregando' : 'Cadastrar'}</button>

        <div className="form-link">
          <Link to="/">Já tenho uma conta!</Link>
        </div>
      </Form>
    </>
  );
}
