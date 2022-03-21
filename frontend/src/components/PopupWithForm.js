import React from 'react';
import Form from './Form';
import Popup from './Popup';

function PopupWithForm({ name, isOpen, onClose, ...props }) {
  return (
    <Popup
      isOpen={isOpen}
      containerType='popup__container_type_white'
      onClose={onClose}
      btnAriaText='Закрыть форму.'
      className={`popup_type_${name} ${isOpen ? `popup_opened` : ``}`.trim()}
    >
      <Form formBlockClass='popup' name={name} {...props} />
    </Popup>
  );
}

export default PopupWithForm;
