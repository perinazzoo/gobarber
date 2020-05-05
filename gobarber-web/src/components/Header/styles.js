import styled from 'styled-components';

export const Container = styled.div`
  background: #fefefe;
  padding: 0 30px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1080px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      color: #690db9;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  img {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
