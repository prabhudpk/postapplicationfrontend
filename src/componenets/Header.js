import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to={{pathname:"/"}} className="navbar-brand">Connectify</Link>
        <div className="navbar-links">
          <Link to={{pathname:"/login"}}  className="nav-link">Login</Link>
          <Link to={{pathname:"/register"}}  className="nav-link">Register</Link>
          <div className="user-icon">&#128100;</div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
