import React, { useState } from 'react';
import Container from '~/components/Container';
import DateInput from '~/components/DateInput';

import { Content } from './styles';

const SelectDateTime = () => {
  const [date, setDate] = useState('');

  return (
    <Container>
      <Content>
        <DateInput date={date} onChange={setDate} />
      </Content>
    </Container>
  );
};

export default SelectDateTime;
