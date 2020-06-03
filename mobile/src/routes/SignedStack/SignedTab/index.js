import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '~/components/CustomTabBar';

import Dashboard from '~/screens/Dashboard';
import Profile from '~/screens/Profile';

import IconsConfig from '~/config/Icons';

const Tab = createBottomTabNavigator();

export default function SignedTab() {
  return (
    <>
      <Tab.Navigator
        // eslint-disable-next-line react/jsx-props-no-spreading
        tabBar={(props) => <CustomTabBar {...props} />}
        tabBarOptions={{
          activeTintColor: '#7159C1',
          inactiveTintColor: '#666',
          keyboardHidesTabBar: true,
          style: {
            backgroundColor: '#fff',
            height: 56,
            borderTopColor: '#eee',
            elevation: 3,
          },
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const { lib: Icon, name } = IconsConfig[route.name];
            return <Icon name={name} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="dashboard" component={Dashboard} />
        <Tab.Screen name="profile" component={Profile} />
      </Tab.Navigator>
    </>
  );
}
