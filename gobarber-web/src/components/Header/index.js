import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Notification from '../Notification';

import logo from '~/assets/logoheader.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const { avatar, name } = useSelector(({ user }) => user);

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
              <strong>{name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src={
                avatar.url ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt="Gab delas"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
