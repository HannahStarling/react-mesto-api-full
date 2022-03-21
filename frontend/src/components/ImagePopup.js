import React from 'react';
import Popup from './Popup';

function ImagePopup({ card, onClose }) {
  return (
    <Popup
      isOpen={card.name && card.link}
      containerType='popup__container_type_transparent'
      onClose={onClose}
      className={`${card.name && card.link ? `popup_type_image popup_opened` : `popup_type_image`}`}
    >
      <figure className='popup__figure'>
        <img src={card.link ? card.link : '#'} className='popup__image' alt={card.name ? card.name + '.' : '#'} />
        <figcaption className='popup__caption'>{card.name && card.name}</figcaption>
      </figure>
    </Popup>
  );
}

export default ImagePopup;
