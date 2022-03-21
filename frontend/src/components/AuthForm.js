import React, { useState } from 'react';
import Form from './Form';

function AuthForm({ children, onAuth, buttonText, name, title, ...props }) {
  const [login, setLogin] = useState({ password: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const { email, password } = login;

  function handleSubmit(e) {
    e.preventDefault();
    onAuth(password, email);
  }

  return (
    <section className='login content__center'>
      <Form
        formBlockClass='login'
        hasInput={true}
        onSubmit={handleSubmit}
        name={name}
        title={title}
        buttonText={buttonText}
      >
        <label className='login__input-label'>
          <input
            value={email}
            onChange={handleChange}
            autoComplete='off'
            type='email'
            className='login__item'
            id='email'
            name='email'
            placeholder='Email'
            required
          />
          <span className='login__input-error login__input-error_type_email'></span>
        </label>
        <label className='login__input-label'>
          <input
            value={password}
            onChange={handleChange}
            autoComplete='off'
            type='password'
            className='login__item'
            id='password'
            name='password'
            placeholder='Пароль'
            required
          />
          <span className='login__input-error login__input-error_type_password'></span>
        </label>
      </Form>
      {children}
    </section>
  );
}

export default AuthForm;
