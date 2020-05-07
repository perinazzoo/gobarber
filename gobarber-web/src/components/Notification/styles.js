import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import scrollbar from 'react-perfect-scrollbar';

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;

  ${({ hasUnread }) =>
    hasUnread &&
    css`
      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;

        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: #ff892e;
      }
    `}
`;

export const NotificationList = styled.div`
  position: absolute;
  width: 260px;
  left: calc(50% - 130px);
  top: calc(100% + 20px);
  background: rgba(0, 0, 0, 0.75);
  border-radius: 4px;
  padding: 15px 5px;
  z-index: 1;

  display: ${({ visible }) => (visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid rgba(0, 0, 0, 0.75);
  }
`;

export const Notification = styled.div`
  color: #fefefe;

  & + div {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  p {
    font-size: 13px;
    line-height: 18px;
  }

  time {
    display: block;
    font-size: 12px;
    opacity: 0.6;
  }

  button {
    font-size: 12px;
    border: none;
    background: none;
    color: ${lighten(0.2, '#690db9')};
  }

  ${({ unread }) =>
    unread &&
    css`
      &::after {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50px;
        background: #ff892e;
        margin-left: 10px;
      }
    `}
`;

export const Scroll = styled(scrollbar)`
  max-height: 260px;
  padding: 5px 15px;

  .ps--clicking,
  .ps__rail-y:focus,
  .ps__rail-y:hover {
    background-color: transparent !important;
  }
`;
