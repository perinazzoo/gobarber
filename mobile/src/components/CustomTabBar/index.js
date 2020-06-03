import React, { useMemo, useEffect, useState, useCallback } from 'react';

import { View, Dimensions, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

import SlidingBar from '~/components/SlidingBar';
import PlusButton from '~/components/PlusButton';

import { CustomTouchable } from './styles';

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
  activeTintColor,
  inactiveTintColor,
  keyboardHidesTabBar,
  style,
}) {
  const [keyOpened, setKeyOpened] = useState(false);
  const { width } = Dimensions.get('screen');
  const quarter = useMemo(() => width / 2 / 3, [width]);

  const keyboardShow = useCallback(() => {
    setKeyOpened(true);
  }, []);

  const keyboardHide = useCallback(() => {
    setKeyOpened(false);
  }, []);

  useEffect(() => {
    if (keyboardHidesTabBar) {
      Keyboard.addListener('keyboardDidShow', keyboardShow);
      Keyboard.addListener('keyboardDidHide', keyboardHide);
    }
  }, [keyboardHidesTabBar, keyboardHide, keyboardShow]);

  if (!keyOpened) {
    return (
      <>
        <PlusButton />
        <View style={{ flexDirection: 'row', ...style }}>
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
      </>
    );
  }

  return <View style={{ display: 'none' }} />;
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
  keyboardHidesTabBar: PropTypes.bool,
};

CustomTabBar.defaultProps = {
  style: {},
  activeTintColor: undefined,
  inactiveTintColor: undefined,
  keyboardHidesTabBar: false,
};
