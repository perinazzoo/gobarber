import React, { useState, useMemo } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';

import { Container, DateButton, DateText } from './styles';

export default function DateInput({ date, onChange, setHours }) {
  const { params: provider } = useRoute();
  const [opened, setOpened] = useState(false);

  async function handleChange(e) {
    setOpened(false);
    if (e.nativeEvent.timestamp) {
      onChange(e.nativeEvent.timestamp);

      const { data } = await api.get(`/providers/${provider.id}/available`, {
        params: {
          date: e.nativeEvent.timestamp,
        },
      });

      setHours(data.filter((h) => h.available));
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
};

DateInput.defaultProps = {
  date: null,
};
