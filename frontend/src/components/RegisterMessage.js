import React from 'react';
import successIcon from '../images/success-icon.svg';
import failedIcon from '../images/failed-icon.svg';

function RegisterMessage({ isSuccess }) {
  return (
    <div className='popup__infotooltip'>
      {isSuccess ? (
        <>
          <img
            className='popup__infotooltip-pic'
            src={successIcon}
            alt='Чёрная галочка в кружке, обозначающая успешную регистрацию.'
          />
          <h2 className='popup__title popup__title_type_centered'>Вы успешно зарегистрировались!</h2>
        </>
      ) : (
        <>
          <img
            className='popup__infotooltip-pic'
            src={failedIcon}
            alt='Красный крестик в кружке, обозначающий неуспешную регистрацию.'
          />
          <h2 className='popup__title popup__title_type_centered'>Что-то пошло не так! Попробуйте ещё раз.</h2>
        </>
      )}
    </div>
  );
}

export default RegisterMessage;
