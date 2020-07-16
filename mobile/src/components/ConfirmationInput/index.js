import React, { useMemo } from 'react';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, InputText, IconContainer } from './styles';

export default function ConfirmationInput({ date, time }) {
  const dateFormatted = useMemo(
    () => date && format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  return (
    <Container>
      <InputText>
        {date && time
          ? `${dateFormatted} - ${time}h`
          : 'Confirme o seu horário ao lado'}
      </InputText>
      <IconContainer onPress={() => { }}>
        <Icon name="check-circle" size={36} color="#0BD9AC" />
      </IconContainer>
    </Container>
  );
}
