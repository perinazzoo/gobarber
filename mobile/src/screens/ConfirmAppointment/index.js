import React, { useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Container from '~/components/Container';
import Button from '~/components/Button';

import { Content, ImageContainer, Image, Name, Date } from './styles';

export default function ConfirmAppointment() {
  const {
    params: { provider, time },
  } = useRoute();

  const { navigate } = useNavigation();

  const dateFormatted = useMemo(() => {
    const formattedString = format(
      parseISO(time.value),
      "eeee dd 'de' MMMM 'às' HH':'mm'h'",
      {
        locale: pt,
      }
    );

    return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
  }, [time]);

  async function handleConfirm() {
    await api.post('/appointments', {
      provider_id: provider.id,
      date: time.value,
    });

    navigate('dashboard');
  }

  return (
    <Container>
      <Content>
        <ImageContainer>
          <Image
            source={{
              uri: provider.avatar.url,
            }}
          />
        </ImageContainer>
        <Name>{provider.name}</Name>
        <Date>{dateFormatted}</Date>
        <Button onPress={handleConfirm}>Confirmar Agendamento</Button>
      </Content>
    </Container>
  );
}