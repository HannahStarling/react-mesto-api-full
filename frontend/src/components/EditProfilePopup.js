import React, { useEffect, useState, useContext } from 'react';
import CurrentUserContext from '../context/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { name, about } = useContext(CurrentUserContext);
  const [userInfo, setUserInfo] = useState({ name: '', about: '' });

  useEffect(() => {
    setUserInfo({ name, about });
  }, [name, about, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(userInfo);
  }

  return (
    <PopupWithForm
      hasInput={true}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      name='edit-profile'
      title='Редактировать профиль'
      buttonText='Сохранить'
    >
      <label className='popup__input-label'>
        <input
          value={userInfo.name}
          onChange={handleChange}
          autoComplete='off'
          type='text'
          className='popup__item popup__item_el_name'
          id='name'
          name='name'
          placeholder='Имя профиля'
          minLength='2'
          maxLength='40'
          required
        />
        <span className='popup__input-error popup__input-error_type_name'></span>
      </label>
      <label className='popup__input-label'>
        <input
          value={userInfo.about}
          onChange={handleChange}
          type='text'
          className='popup__item popup__item_el_about'
          id='about'
          name='about'
          placeholder='Описание профиля'
          minLength='2'
          maxLength='200'
          autoComplete='off'
          required
        />
        <span className='popup__input-error popup__input-error_type_about'></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
