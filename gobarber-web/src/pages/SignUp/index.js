import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';

export default function SignUp() {
  return (
    <>
      <form>
        <img src={logo} alt="Logo do GoBarber" />

        <div>
          <input type="text" id="name" placeholder=" " />
          <div>Nome completo</div>
        </div>

        <div>
          <input type="email" id="email" placeholder=" " />
          <div>Email</div>
        </div>

        <div>
          <input type="password" id="pass" placeholder=" " />
          <div>Senha</div>
        </div>

        <div>
          <input type="password" id="confirmPass" placeholder=" " />
          <div>Confirmar senha</div>
        </div>

        <button type="submit">Cadastrar</button>

        <div>
          <Link to="/">Já tenho uma conta!</Link>
        </div>
      </form>
    </>
  );
}
