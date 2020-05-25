import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import Welcome from './screens/Welcome';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Dashboard from './screens/Dashboard';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Signed() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="dashboard" component={Dashboard} />
    </Tab.Navigator>
  );
}

function NotSigned() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="welcome" component={Welcome} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="signin" component={SignIn} />
    </Stack.Navigator>
  );
}

export default function Routes() {
  const signed = useSelector((state) => state.auth.signed);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
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
