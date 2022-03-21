import React from 'react';

function Main({ children, ...props }) {
  return <main className='content page__content'>{children}</main>;
}

export default Main;
