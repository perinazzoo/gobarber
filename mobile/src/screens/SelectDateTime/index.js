import React, { useState, useMemo } from 'react';
import { WheelPicker } from '@delightfulstudio/react-native-wheel-picker-android';

import DateInput from '~/components/DateInput';
import ConfirmationInput from '~/components/ConfirmationInput';

import { Content, PickerContainer } from './styles';

export default function SelectDateTiem() {
  const [date, setDate] = useState('');
  const [hours, setHours] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');

  const times = useMemo(() => hours.map((h) => h.time), [hours]);

  return (
    <Content>
      <DateInput date={date} onChange={setDate} setHours={setHours} />
      <PickerContainer>
        {times !== [] && (
          <WheelPicker
            data={times}
            isAtmospheric
            selectedItemPosition={times.length / 2}
            visibleItemCount={7}
            itemTextColor="#9583D1"
            selectedItemTextColor="#7159c1"
            itemTextFontFamily="Montserrat-SemiBold"
            style={{ height: '100%', width: '100%' }}
            onItemSelected={(item) => setSelectedTime(item.data)}
          />
        )}
      </PickerContainer>
      <ConfirmationInput date={date} time={selectedTime} />
    </Content>
  );
}
