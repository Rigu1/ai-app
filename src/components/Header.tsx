import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f6f6f6;
  padding: 1em 3em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  color: #e60023;
`;

const Nav = styled.div`
  display: flex;
  gap: 2em;

  a {
    text-decoration: none;
    font-size: 1em;
    color: #333;
    &:hover {
      color: #e60023;
    }
  }
`;

const Header: React.FC = () => {
  return (
    <Container>
      <Logo>AI Photo Studio</Logo>
      <Nav>
        <a href="#home">홈</a>
        <a href="#tools">도구</a>
        <a href="#convert">변환</a>
        <a href="#about">소개</a>
      </Nav>
    </Container>
  );
};

export default Header;
