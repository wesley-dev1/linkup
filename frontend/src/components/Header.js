import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #fff;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-size: 24px;
  color: #1877f2;
`;

const Nav = styled.nav`
  a {
    margin-left: 20px;
    font-size: 16px;
    color: #1877f2;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>LinkUp</Logo>
      <Nav>
        <a href="/login">Login</a>
        <a href="/register">Registrar</a>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
