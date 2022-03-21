import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Menu({ isActive, onSignOut, email, loggedIn }) {
  const location = useLocation();
  const REGISTER_ROUTE = '/sign-up';
  const LOGIN_ROUTE = '/sign-in';
  const isRegister = location.pathname === LOGIN_ROUTE;
  const loginText = loggedIn ? 'Выйти' : isRegister ? 'Регистрация' : 'Войти';

  return (
    <nav className={`menu ${isActive ? 'menu_active' : ''}`.trim()}>
      {loggedIn && <p className='email'>{email}</p>}
      <Link
        onClick={onSignOut}
        to={isRegister ? REGISTER_ROUTE : LOGIN_ROUTE}
        className='session-status-link link-opacity'
      >
        {loginText}
      </Link>
    </nav>
  );
}

export default Menu;
