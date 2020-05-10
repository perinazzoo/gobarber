import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 0 10px;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-self: center;
    align-items: center;

    button {
      border: none;
      background: none;
      display: flex;
    }

    strong {
      display: flex;
      justify-content: center;
      width: 210px;
      color: #fefefe;
      font-size: 24px;
    }
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Time = styled.li`
  padding: 20px;
  border-radius: 4px;
  background: #fefefe;

  opacity: ${({ past }) => (past ? 0.6 : 1)};

  strong {
    display: block;
    color: ${({ available }) => (available ? '#666' : '#20BA58')};
    font-size: 20px;
    font-weight: normal;
  }

  span {
    display: block;
    margin-top: 3px;
    color: ${({ available }) => (available ? '#999' : '#666')};
  }
`;
