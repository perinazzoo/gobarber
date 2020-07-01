import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import api from '~/services/api';

import Images from '~/mock/Images';

import { Container, Content, Card, Background, Avatar, Name } from './styles';

export default function SelectProvider() {
  const { navigate } = useNavigation();
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await api.get('/providers');

      const data = response.data.map((provider) => ({
        ...provider,
        bg: Math.floor(Math.random() * (11 - 1)) + 1,
      }));

      setProviders(data);
    })();
  }, []);

  return (
    <Container>
      <Content
        data={providers}
        keyExtractor={(provider) => provider.id}
        renderItem={({ item }) => (
          <Card onPress={() => navigate('SelectDateTime', item)}>
            <Background source={Images[item.bg]}>
              <Avatar
                source={{
                  uri: item.avatar
                    ? item.avatar.url
                    : `https://api.adorable.io/avatars/120/${item.name}.png`,
                }}
              />
              <Name>{item.name}</Name>
            </Background>
          </Card>
        )}
      />
    </Container>
  );
}
