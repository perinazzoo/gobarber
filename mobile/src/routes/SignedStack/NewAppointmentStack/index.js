import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import SelectProvider from '~/screens/SelectProvider';

const Stack = createStackNavigator();

export default function NewAppointmentStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="SelectProvider" component={SelectProvider} />
    </Stack.Navigator>
  );
}
