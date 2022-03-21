import React from 'react';

function BurgerBtn({ onDropdown, isActive, ...props }) {
  return (
    <button
      onClick={onDropdown}
      className={`dropdown-menu-btn button ${isActive ? 'dropdown-menu-btn_active' : ''}`.trim()}
    >
      <span
        className={`dropdown-menu-btn__element ${isActive ? 'dropdown-menu-btn__element_active' : ''}`.trim()}
      ></span>
    </button>
  );
}

export default BurgerBtn;
