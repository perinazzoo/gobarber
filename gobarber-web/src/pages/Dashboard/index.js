import React, { useEffect, useState, useMemo } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  parseISO,
  isSameHour,
  isBefore,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import { Container, Time } from './styles';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

export default function Dashboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    (async () => {
      const response = await api.get('/schedule', { params: { date } });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = range.map((time) => {
        const fixDate = setSeconds(setMinutes(setHours(date, time), 0), 0);
        const dateToCompare = utcToZonedTime(fixDate, timezone);

        return {
          time: time.length === 1 ? `0${time}:00` : `${time}:00`,
          past: isBefore(dateToCompare, new Date()),
          appointment: response.data.find((a) =>
            isSameHour(dateToCompare, parseISO(a.date))
          ),
        };
      });

      setSchedule(data);
    })();
  }, [date]);

  function handleSubDays() {
    setDate(subDays(date, 1));
  }

  function handleAddDays() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handleSubDays}>
          <MdChevronLeft size={36} color="#fefefe" />
        </button>

        <strong>{dateFormatted}</strong>

        <button type="button" onClick={handleAddDays}>
          <MdChevronRight size={36} color="#fefefe" />
        </button>
      </header>

      <ul>
        {schedule.map(({ time, appointment, past }) => (
          <Time key={time} past={past} available={!appointment}>
            <strong>{time}</strong>
            <span>{appointment ? appointment.user.name : 'Em aberto'}</span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
