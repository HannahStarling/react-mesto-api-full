import React, { useContext } from 'react';
import CurrentUserContext from '../context/CurrentUserContext';

function Card({
  link,
  name,
  likes,
  likes: { length },
  owner: { _id: owner },
  id,
  selectDeletedCard,
  onCardClick,
  onCardLike,
  onCardDelete,
  onDeleteConfirm,
  ...props
}) {
  const { _id } = useContext(CurrentUserContext);
  const isOwn = owner === _id;
  const isLiked = likes.find(({ _id: id }) => id === _id);

  function handleCardLike() {
    onCardLike({ likes, id });
  }

  function handleCardClick() {
    onCardClick({ name, link });
  }

  function handleCardDelete() {
    selectDeletedCard(id);
    onDeleteConfirm(true);
  }

  return (
    <li className='elements__item'>
      <img onClick={handleCardClick} src={link} className='elements__image' alt={name + '.'} />
      <div className='elements__details-wrapper'>
        <h2 className='elements__title'>{name}</h2>
        <button
          className={`button elements__like-btn ${isLiked ? 'elements__like-btn_active' : ''}`.trim()}
          type='button'
          aria-label='Поставить лайк.'
          onClick={handleCardLike}
        ></button>
        <span className='elements__like-counter'>{length}</span>
        <button
          className={`button ${isOwn ? 'elements__delete-btn' : 'elements__delete-btn_hidden'}`}
          type='button'
          aria-label='Удалить карточку.'
          onClick={handleCardDelete}
        ></button>
      </div>
    </li>
  );
}

export default Card;
