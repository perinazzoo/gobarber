import React, { useEffect, useState } from 'react';

import api from '~/services/api';

import AppointmentItem from '~/components/AppointmentItem';

import Title from '~/components/Title';

import { Container, List } from './styles';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await api.get('/appointments');

      const data = response.data.map((appoint) => ({
        ...appoint,
        id: String(appoint.id),
      }));

      setAppointments(data);
    })();
  }, []);

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
