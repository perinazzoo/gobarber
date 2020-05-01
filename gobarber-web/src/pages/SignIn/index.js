import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';

export default function SignIn() {
  return (
    <>
      <form>
        <img src={logo} alt="Logo do GoBarber" />

        <div>
          <input type="email" placeholder=" " />
          <div>Email</div>
        </div>

        <div>
          <input type="password" placeholder=" " />
          <div>Senha</div>
        </div>

        <button type="submit" onClick={(e) => e.preventDefault()}>
          Entrar
        </button>

        <div>
          <Link to="/register">Ainda não tem uma conta?</Link>
        </div>
      </form>
    </>
  );
}
