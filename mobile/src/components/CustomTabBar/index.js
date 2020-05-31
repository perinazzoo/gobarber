import React, { useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import SlidingBar from '~/components/SlidingBar';

import { CustomTouchable } from './styles';

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
  activeTintColor,
  inactiveTintColor,
  style,
}) {
  const { width } = Dimensions.get('screen');
  const quarter = useMemo(() => width / 2 / 3, [width]);

  return (
    <View style={{ flexDirection: 'row', position: 'relative', ...style }}>
      <SlidingBar routeIndex={state.index} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const { tabBarIcon: Icon } = options;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <CustomTouchable
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.key}
            index={index}
            quarter={quarter}
          >
            {Icon && (
              <Icon
                color={
                  isFocused
                    ? activeTintColor || 'blue'
                    : inactiveTintColor || '#ddd'
                }
                size={25}
              />
            )}
          </CustomTouchable>
        );
      })}
    </View>
  );
}

CustomTabBar.propTypes = {
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  activeTintColor: PropTypes.string,
  inactiveTintColor: PropTypes.string,
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
  descriptors: PropTypes.objectOf(PropTypes.any).isRequired,
  state: PropTypes.objectOf(PropTypes.any).isRequired,
};

CustomTabBar.defaultProps = {
  style: {},
  activeTintColor: undefined,
  inactiveTintColor: undefined,
};
