import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, TextInput } from './styles';

function Input({ style, IconName, ...rest }, ref) {
  return (
    <Container style={style}>
      {IconName && <Icon name={IconName} size={20} color="#9583D1" />}
      <TextInput {...rest} ref={ref} />
    </Container>
  );
}

export default forwardRef(Input);

Input.propTypes = {
  IconName: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
  style: null,
  IconName: null,
};
