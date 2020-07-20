import React, { useState, useMemo, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WheelPicker } from '@delightfulstudio/react-native-wheel-picker-android';

import DateInput from '~/components/DateInput';
import ConfirmationInput from '~/components/ConfirmationInput';

import { Content, PickerContainer } from './styles';

export default function SelectDateTiem() {
  const { params: provider } = useRoute();
  const { navigate } = useNavigation();
  const [date, setDate] = useState('');
  const [hours, setHours] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  const times = useMemo(() => hours.map((h) => h.time), [hours]);

  useEffect(() => {
    if (!selectedTime) {
      setSelectedTime(times[parseInt(times.length / 2, 10)]);
    }
  }, [times, selectedTime]);

  function handleConfirmDateTime() {
    const time = hours.find((hour) => hour.time === selectedTime);

    if (!time || !date) return;

    navigate('ConfirmAppointment', {
      time,
      provider,
    });
  }

  return (
    <Content>
      <DateInput
        date={date}
        onChange={setDate}
        setHours={setHours}
        id={provider.id}
      />
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
      <ConfirmationInput
        date={date}
        time={selectedTime}
        onPress={handleConfirmDateTime}
      />
    </Content>
  );
}
