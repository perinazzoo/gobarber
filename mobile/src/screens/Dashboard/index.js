import React from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Title from '~/components/Title';

import {
  Container,
  List,
  ListItem,
  ProviderInfo,
  Avatar,
  TextInfo,
  Name,
  Time,
} from './styles';

const test = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Dashboard() {
  return (
    <Container>
      <Title marginBottom="10px" style={{ alignSelf: 'center' }}>
        Agendamentos
      </Title>

      <List
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item)}
        data={test}
        renderItem={({ item }) => (
          <ListItem>
            <ProviderInfo>
              <Avatar
                source={{
                  uri:
                    'https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=3759e09a5b9fbe53088b23c615b6312e',
                }}
              />
              <TextInfo>
                <Name>La Belle</Name>
                <Time>Amanhã às 11:00h</Time>
              </TextInfo>
            </ProviderInfo>

            <Icon name="event-busy" size={24} color="#FF637E" />
          </ListItem>
        )}
      />
    </Container>
  );
}
