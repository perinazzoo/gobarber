import React, { useState } from 'react';
import { Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';

import { Container, DateButton, DateText } from './styles';

export default function DateInput({ id, date, onChange, setHours }) {
  const [opened, setOpened] = useState(false);

  async function handleChange(e) {
    try {
      setOpened(false);
      if (e.nativeEvent.timestamp) {
        onChange(e.nativeEvent.timestamp);

        const { data } = await api.get(`/providers/${id}/available`, {
          params: {
            date: e.nativeEvent.timestamp,
          },
        });

        setHours(data.filter((h) => h.available));
      }
    } catch (err) {
      Alert.alert('Oops', 'Algo deu errado, por favor, tente novamente');
    }
  }

  return (
    <Container>
      <DateButton onPress={() => setOpened(true)}>
        <Icon name="event" color="#9583D1" size={20} />
        <DateText>Toque para escolher uma data</DateText>
      </DateButton>

      {opened && (
        <DateTimePicker
          value={date || new Date()}
          onChange={handleChange}
          minimumDate={new Date()}
          locale="pt"
          mode="date"
        />
      )}
    </Container>
  );
}

DateInput.propTypes = {
  date: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  setHours: PropTypes.func.isRequired,
  id: PropTypes.number,
};

DateInput.defaultProps = {
  date: null,
  id: null,
};
