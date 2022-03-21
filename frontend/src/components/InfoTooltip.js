import React from 'react';
import Popup from './Popup';
import RegisterMessage from './RegisterMessage';

function InfoTooltip({ isSuccess, isOpen, onClose }) {
  return (
    <Popup
      isOpen={isOpen}
      containerType='popup__container_type_white'
      onClose={onClose}
      btnAriaText='Закрыть.'
      className={`${isOpen ? `popup_opened` : ``}`.trim()}
    >
      <RegisterMessage isSuccess={isSuccess} />
    </Popup>
  );
}

export default InfoTooltip;
