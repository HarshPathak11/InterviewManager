import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4.5rem;
  z-index: 100;
  background: rgba(205, 205, 207, 0.75);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled.div`
  font-size: 2rem;
  font-weight: 900;
  font-family: 'Jost';
  color: #4a90e2;
  display: flex;
  align-items: center;

  span {
    color: #16a34a;
  }
  @media (max-width: 600px) {
    font-size:1.5rem
    }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 600px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 3.5rem;
    right: 0;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1rem;
    z-index: 50;
  }

  a {
    text-decoration: none;
    color: #fff;
    background-color: #000;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
      background-color: #4a4a4a;
    }
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 600px) {
    display: block;
  }

  div {
    width: 25px;
    height: 3px;
    background-color: #4a4a4a;
    margin: 4px 0;
    transition: 0.3s;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isAdmin = false; // Example: Replace with your actual admin check logic

  return (
    <Nav>
      <NavContainer>
        <Brand>
          Interview<span>Scheduler</span>
        </Brand>
        <Hamburger onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </Hamburger>
        <NavLinks isOpen={isOpen}>
          {isAdmin && <Link to="/admin">Dashboard</Link>}
          <Link to="/">Dashboard</Link>
          <Link to="/create">Schedule Interview</Link>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
