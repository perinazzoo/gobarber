import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { parseISO, formatRelative } from 'date-fns';
import { pt } from 'date-fns/locale';

import { ListItem, ProviderInfo, Avatar, TextInfo, Name, Time } from './styles';

export default function AppoitmentItem({ item, handleCancel }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(item.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [item.date]);

  return (
    <ListItem past={item.past}>
      <ProviderInfo>
        <Avatar
          source={{
            uri: item.provider.avatar
              ? item.provider.avatar.url
              : 'https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=3759e09a5b9fbe53088b23c615b6312e',
          }}
        />
        <TextInfo>
          <Name>{item.provider.name}</Name>
          <Time>{dateParsed}</Time>
        </TextInfo>
      </ProviderInfo>

      {item.cancelable && !item.cancelled_at && (
        <TouchableOpacity onPress={handleCancel}>
          <Icon name="event-busy" size={24} color="#FF637E" />
        </TouchableOpacity>
      )}
    </ListItem>
  );
}

AppoitmentItem.propTypes = {
  item: PropTypes.shape({
    provider: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
    past: PropTypes.bool,
    cancelable: PropTypes.bool,
    date: PropTypes.string,
    cancelled_at: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  }),
  handleCancel: PropTypes.func.isRequired,
};

AppoitmentItem.defaultProps = {
  item: {},
};
