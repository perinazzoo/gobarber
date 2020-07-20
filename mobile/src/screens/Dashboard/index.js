import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native';

import api from '~/services/api';

import AppointmentItem from '~/components/AppointmentItem';

import Title from '~/components/Title';

import { Container, List } from './styles';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  const loadAppoitments = useCallback(() => {
    (async () => {
      try {
        const response = await api.get('/appointments');

        const data = response.data.map((appoint) => ({
          ...appoint,
          id: String(appoint.id),
        }));

        const pastItems = data.filter((item) => item.past);

        const futureItems = data.filter((item) => !item.past);

        const sortedPastItems = pastItems.sort((a, b) => {
          if (a.date > b.date) return -1;

          return 1;
        });

        setAppointments([...futureItems, ...sortedPastItems]);
      } catch (err) {
        Alert.alert('Oops', 'Algo deu errado, por favor, tente novamente');
      }
    })();
  }, []);

  useFocusEffect(loadAppoitments);

  async function handleCancel(id) {
    await api.delete(`/appointments/${id}`);

    setAppointments(appointments.filter((appoint) => appoint.id !== id));
  }

  return (
    <Container>
      <Title marginBottom="10px" style={{ alignSelf: 'center' }}>
        Agendamentos
      </Title>

      <List
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={appointments}
        renderItem={({ item }) => (
          <AppointmentItem
            handleCancel={() => handleCancel(item.id)}
            item={item}
          />
        )}
      />
    </Container>
  );
}
