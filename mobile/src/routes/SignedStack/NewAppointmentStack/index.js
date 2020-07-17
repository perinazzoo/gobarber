import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SelectProvider from '~/screens/SelectProvider';
import SelectDateTime from '~/screens/SelectDateTime';
import ConfirmAppointment from '~/screens/ConfirmAppointment';

const Stack = createStackNavigator();

export default function NewAppointmentStack() {
  const { goBack, navigate } = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0,
        },
        headerTitleAlign: 'center',
        headerTintColor: '#7159c1',
        headerTitleStyle: {
          fontFamily: 'Montserrat-Bold',
        },
        headerLeftContainerStyle: {
          marginLeft: 35,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="SelectProvider"
        component={SelectProvider}
        options={{
          title: 'Selecione o prestador',
          headerLeft: () => (
            <TouchableOpacity onPress={() => goBack()}>
              <Icon name="arrow-back" size={30} color="#7159C1" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={{
          title: 'Agora defina a data',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigate('SelectProvider')}>
              <Icon name="arrow-back" size={30} color="#7159C1" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="ConfirmAppointment"
        component={ConfirmAppointment}
        options={{
          title: 'Tem certeza?',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigate('SelectDateTime')}>
              <Icon name="arrow-back" size={30} color="#7159C1" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
