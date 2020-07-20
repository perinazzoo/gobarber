import React from 'react';
import { Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Button } from './styles';

export default function PlusButton() {
  const { navigate } = useNavigation();
  const { width } = Dimensions.get('screen');

  function handleNavigate() {
    navigate('NewStack');
  }

  return (
    <TouchableWithoutFeedback onPress={handleNavigate}>
      <Button screenWidth={width}>
        <Icon name="add" size={30} color="#fff" />
      </Button>
    </TouchableWithoutFeedback>
  );
}
