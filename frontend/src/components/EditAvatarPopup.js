import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      hasInput={true}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      name='edit-avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
    >
      <label className='popup__input-label'>
        <input
          defaultValue=''
          ref={avatarRef}
          autoComplete='off'
          type='url'
          className='popup__item popup__item_el_avatar'
          id='avatar'
          name='avatar'
          placeholder='Ссылка на аватар'
          required
        />
        <span className='popup__input-error popup__input-error_type_avatar'></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
