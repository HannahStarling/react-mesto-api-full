import React, { useState } from 'react';
import BurgerBtn from './Navigation/BurgerBtn';
import Logo from './Logo';
import Menu from './Navigation/Menu';

function Header({ loggedIn, email, onSignOut, ...props }) {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleDropdownMenu = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  return (
    <header className='header page__header'>
      <nav className='header__nav'>
        <Logo />
        <BurgerBtn isActive={isDropdownActive} onDropdown={handleDropdownMenu} />
      </nav>
      <Menu isActive={isDropdownActive} onSignOut={onSignOut} email={email} loggedIn={loggedIn} />
    </header>
  );
}

export default Header;
