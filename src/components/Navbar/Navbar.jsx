// src/components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #4a90e2;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  a {
    color: #fff;
    margin-left: 1rem;
    text-decoration: none;
    font-weight: bold;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <h1 style={{ color: '#fff' }}>Interview Scheduler</h1>
      <NavLinks>
        <Link to="/">Dashboard</Link>
        <Link to="/create">Schedule Interview</Link>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
