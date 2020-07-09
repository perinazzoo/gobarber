import React, { useState, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, DateButton, DateText } from './styles';

export default function DateInput({ date, onChange }) {
  const [opened, setOpened] = useState(false);
  const dateFormatted = useMemo(
    () => date && format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  function handleChange(e) {
    setOpened(false);
    onChange(e.nativeEvent.timestamp);
  }

  return (
    <Container>
      <DateButton onPress={() => setOpened(true)}>
        <Icon name="event" color="#9583D1" size={20} />
        <DateText>{date ? dateFormatted : 'Escolha uma data'}</DateText>
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
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

DateInput.defaultProps = {
  date: '',
};
