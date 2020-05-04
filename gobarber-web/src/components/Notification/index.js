import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications, MdNotificationsNone } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import {
  Container,
  Badge,
  NotificationList,
  Notification,
  Scroll,
} from './styles';

export default function NotificationWrapper() {
  const [opened, setOpened] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasUnread = useMemo(
    () => notifications.some((notification) => notification.read === false),
    [notifications]
  );

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/notifications');

      const fomattedData = data.map((notification) => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          {
            locale: pt,
          }
        ),
      }));

      setNotifications(fomattedData);
    })();
  }, []);

  async function handleMarkAsRead(id) {
    await api.put(`/notifications/${id}`);

    setNotifications(
      notifications.map((notification) =>
        // eslint-disable-next-line no-underscore-dangle
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  }

  return (
    <Container>
      <Badge onClick={() => setOpened(!opened)} hasUnread={hasUnread}>
        {opened ? (
          <MdNotifications color="#690db9" size={26} />
        ) : (
            <MdNotificationsNone color="#690db9" size={26} />
          )}
      </Badge>

      <NotificationList visible={opened}>
        <Scroll>
          {notifications.map((notification) => (
            // eslint-disable-next-line no-underscore-dangle
            <Notification unread={!notification.read} key={notification._id}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && (
                <button
                  type="button"
                  // eslint-disable-next-line no-underscore-dangle
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
