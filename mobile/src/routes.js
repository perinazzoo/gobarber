import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="signin" component={SignIn} />
        <Screen name="signup" component={SignUp} />
      </Navigator>
    </NavigationContainer>
  );
}
