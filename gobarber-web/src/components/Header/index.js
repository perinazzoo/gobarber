import React from 'react';
import { Link } from 'react-router-dom';

import Notification from '../Notification';

import logo from '~/assets/logoheader.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Logo GoBarber" />
          <Link to="/schedule">AGENDA</Link>
        </nav>

        <aside>
          <Notification />
          <Profile>
            <div>
              <strong>Gab delas de nazzo</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/50/abott@adorable.png"
              alt="Gab delas"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
