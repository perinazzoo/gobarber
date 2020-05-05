import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 0 10px;

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

    h2 {
      color: #333;
      margin-bottom: 20px;
    }

    hr {
      margin-bottom: 20px;
      height: 1px;
      border: 0.5px solid #eee;
    }

    button[type='submit'] {
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
        background: ${darken(0.08, '#690db9')};
      }

      & + button {
        margin-top: 10px;
      }
    }

    button[type='button'] {
      background: #f23d5e;
      height: 44px;
      border: 0;
      border-radius: 4px;
      font-weight: bold;
      color: #fefefe;
      font-size: 16px;
      transition: all ease-out 0.3s;
      margin-top: 5px;
      position: relative;

      &:hover {
        background: ${darken(0.1, '#f23d5e')};
      }
    }

    > div {
      width: 100%;
      position: relative;
      margin-bottom: 20px;
      text-align: left;

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

        &:not(:placeholder-shown) {
          color: rgba(105, 13, 185, 1);
          border: 2px solid rgba(105, 13, 185, 1);
        }

        &:focus {
          border: 2px solid rgba(105, 13, 185, 1);
          color: rgba(105, 13, 185, 1);
        }
      }

      input:focus + div,
      input:not(:placeholder-shown) + div {
        transform: scale(0.9) translateY(-85%);
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
