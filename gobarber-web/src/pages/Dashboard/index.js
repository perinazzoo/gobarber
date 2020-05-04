import React, { useEffect } from 'react';
import api from '~/services/api';

export default function Dashboard() {
  useEffect(() => {
    (async () => {
      await api.get('appointments');
    })();
  }, []);

  return <h1>Abajur corno de bnosta</h1>;
}
