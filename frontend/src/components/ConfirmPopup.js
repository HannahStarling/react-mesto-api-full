import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ deletedId, onClose, isOpen, onDeleteCard }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(deletedId);
  }

  return (
    <PopupWithForm
      hasInput={false}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      name='delete-card'
      title='Вы уверены?'
      buttonText='Да'
    />
  );
}

export default ConfirmPopup;
