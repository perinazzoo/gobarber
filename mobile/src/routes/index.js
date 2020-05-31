import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import Signed from './SignedStack';
import NotSigned from './NotSignedStack';

const Stack = createStackNavigator();

export default function Routes() {
  const signed = useSelector((state) => state.auth.signed);

  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        {signed ? (
          <Stack.Screen name="signed" component={Signed} />
        ) : (
            <Stack.Screen name="notsigned" component={NotSigned} />
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
