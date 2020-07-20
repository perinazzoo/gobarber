import React from 'react';
import posed from 'react-native-pose';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('screen');

export const Bar = posed.View({
  route0: { x: 0 },
  route1: { x: width / 2 },
});

export default function SlidingBar({ routeIndex }) {
  return (
    <Bar
      pose={`route${routeIndex}`}
      style={{
        position: 'absolute',
        width: width / 2,
        height: 2.5,
        backgroundColor: '#7159c1',
      }}
    />
  );
}

SlidingBar.propTypes = {
  routeIndex: PropTypes.number.isRequired,
};
