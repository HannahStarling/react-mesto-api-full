import React from 'react';
import AuthForm from './AuthForm';

function Login({ onSignIn, ...props }) {
  return <AuthForm onAuth={onSignIn} name='sign-in' title='Вход' buttonText='Войти' />;
}

export default Login;
