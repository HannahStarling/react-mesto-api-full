import React from 'react';
import Popup from './Popup';

function ErrorMessage({ isServerError, isOpen, onClose, message, ...props }) {
  return (
    <Popup
      isOpen={isOpen}
      containerType='popup__container_type_top'
      onClose={onClose}
      btnAriaText='Закрыть.'
      className={`${isOpen ? `popup_opened` : ``}`.trim()}
    >
      <div className='popup__error'>
        <h2 className='popup__title popup__title_type_centered'>
          {isServerError ? message : 'Произошла ошибка, свяжитесь с технической поддержкой нашего приложения.'}
        </h2>
      </div>
    </Popup>
  );
}

export default ErrorMessage;
