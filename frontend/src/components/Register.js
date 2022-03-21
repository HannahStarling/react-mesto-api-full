import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register({ onSignUp, ...props }) {
  return (
    <AuthForm onAuth={onSignUp} name='sign-up' title='Регистрация' buttonText='Зарегистрироваться'>
      <p className='login__signin'>
        Уже зарегистрированы?&nbsp;
        <Link to='sign-in' className='login__signin-link link-opacity'>
          Войти
        </Link>
      </p>
    </AuthForm>
  );
}

export default Register;
