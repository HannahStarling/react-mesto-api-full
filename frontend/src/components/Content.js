import React, { useContext } from 'react';
import CurrentUserContext from '../context/CurrentUserContext';
import avatarIsLoading from '../images/avatarIsLoading.svg';
import Card from './Card';

function Content({
  cards,
  selectDeletedCard,
  onDeleteConfirm,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardLike,
  onCardClick,
  onCardDelete,
}) {
  const { name, about, avatar } = useContext(CurrentUserContext);
  return (
    <>
      <section className='profile content__center'>
        <div className='profile__avatar'>
          <img src={avatar ? avatar : avatarIsLoading} alt='Аватар пользователя.' className='profile__image' />
          <button className='button profile__btn profile__btn_action_avatar' onClick={onEditAvatar}></button>
        </div>
        <div className='profile__info'>
          <h1 className='profile__name'>{name}</h1>
          <p className='profile__description'>{about}</p>
          <button
            onClick={onEditProfile}
            className='button profile__btn profile__btn_action_edit'
            type='button'
            aria-label='Редактировать профиль.'
          ></button>
        </div>
        <button
          onClick={onAddPlace}
          className='button profile__btn profile__btn_action_add'
          type='button'
          aria-label='Добавить карточку-фотографию.'
        ></button>
      </section>
      <section className='elements content__center'>
        <ul className='elements__list'>
          {cards.map(({ _id, ...props }) => {
            return (
              <Card
                key={_id}
                id={_id}
                selectDeletedCard={selectDeletedCard}
                onDeleteConfirm={onDeleteConfirm}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                {...props}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default Content;
