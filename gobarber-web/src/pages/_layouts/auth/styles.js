import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(59, 0, 100, 1) 0%,
    rgba(101, 0, 179, 1) 27%,
    rgba(155, 155, 255, 1) 100%
  );

  display: flex;
  align-items: center;
  justify-content: center;

  overflow-y: auto;
  position: relative;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 375px;
  text-align: center;
  position: relative;
  z-index: 1;

  .input-error {
    border: 2px solid red;
    color: red;
  }

  .label-error {
    color: red;
    transform: scale(0.9) translateY(-150%) !important;
    transition: transform 0ms;
  }

  .form-link {
    text-align: center !important;
  }

  form {
    display: flex;
    flex-direction: column;
    background: #fefefe;
    padding: 30px;
    border-radius: 8px;

    img {
      margin-bottom: 30px;
    }

    button {
      background: #690db9;
      height: 44px;
      border: 0;
      border-radius: 4px;
      font-weight: bold;
      color: #fefefe;
      font-size: 16px;
      transition: all ease-out 0.1s;
      margin-top: 5px;
      position: relative;

      &:hover {
        background: transparent;
        border: 2px solid #690db9;
        color: #690db9;
      }
    }

    > div {
      width: 100%;
      position: relative;
      margin-bottom: 20px;
      text-align: left;

      a {
        display: inline-block;
        margin-top: 30px;
        color: #690db9;
        font-size: 16px;
        position: relative;

        &::after {
          content: '';
          width: 0%;
          height: 2px;
          display: block;
          background: #690db9;
          position: absolute;
          transition: all 0.2s ease-in;
        }

        &:hover::after,
        &:focus::after {
          width: 100%;
        }
      }

      > input {
        width: 100%;
        height: 56px;

        background: none;
        border: 2px solid rgba(105, 13, 185, 0.7);
        border-radius: 4px;
        padding: 13px 15px;
        font-size: 16px;
        color: rgba(105, 13, 185, 0.7);

        transition: all 0.15s ease-in;
        line-height: 24px;

        &:focus {
          border: 2px solid rgba(105, 13, 185, 1);
          color: rgba(105, 13, 185, 1);
        }
      }

      input:focus + div,
      input:not(:placeholder-shown) + div {
        transform: scale(0.9) translateY(-85%);
      }

      input:focus + div {
        color: rgba(105, 13, 185, 1);
      }

      > div {
        position: absolute;
        bottom: 50%;
        left: 8px;

        padding: 0 8px;

        font-size: 16px;
        color: rgba(105, 13, 185, 0.7);

        transform: translateY(50%);
        pointer-events: none;
        transition: all 0.1s linear;
        background: #fefefe;
      }

      > span {
        font-size: 12px;
        color: red;
      }
    }
  }
`;
