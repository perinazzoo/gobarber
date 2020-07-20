import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Welcome from '~/screens/Welcome';
import SignUp from '~/screens/SignUp';
import SignIn from '~/screens/SignIn';

const Stack = createStackNavigator();

export default function NotSigned() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="welcome" component={Welcome} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="signin" component={SignIn} />
    </Stack.Navigator>
  );
}
