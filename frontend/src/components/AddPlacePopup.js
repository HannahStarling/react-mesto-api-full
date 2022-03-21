import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  const [newCard, setNewCard] = useState({ name: '', link: '' });

  useEffect(() => {
    setNewCard({ name: '', link: '' });
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard(newCard);
  }

  const { name, link } = newCard;

  return (
    <PopupWithForm
      hasInput={true}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      name='add-card'
      title='Новое место'
      buttonText='Создать'
    >
      <label className='popup__input-label'>
        <input
          value={name}
          onChange={handleChange}
          autoComplete='off'
          type='text'
          className='popup__item popup__item_el_title'
          id='title'
          name='name'
          placeholder='Название'
          minLength='2'
          maxLength='30'
          required
        />
        <span className='popup__input-error popup__input-error_type_title'></span>
      </label>
      <label className='popup__input-label'>
        <input
          value={link}
          onChange={handleChange}
          autoComplete='off'
          type='url'
          className='popup__item popup__item_el_link'
          id='link'
          name='link'
          placeholder='Ссылка на картинку'
          required
        />
        <span className='popup__input-error popup__input-error_type_link'></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
