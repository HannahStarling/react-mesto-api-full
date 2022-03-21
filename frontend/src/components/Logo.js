import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Logo({ ...props }) {
  return (
    <Link to='/' className='logo link-opacity'>
      <img
        className='logo__pic'
        src={logo}
        alt='Логотип приложения Место. Слово Место латиницей с подписью Россия на английском языке.'
      />
    </Link>
  );
}

export default Logo;
