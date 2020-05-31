import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import SignedTab from './SignedTab';
import NewAppointmentStack from './NewAppointmentStack';

const Stack = createStackNavigator();

export default function SignedStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Tabs" component={SignedTab} />
      <Stack.Screen name="NewStack" component={NewAppointmentStack} />
    </Stack.Navigator>
  );
}
