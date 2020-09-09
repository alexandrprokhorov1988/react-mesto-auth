import React from 'react';

function ImagePopup({isOpen, card, onClose}) {

  return (
    <div className={`popup popup_type_img ${isOpen ? 'popup_opened' : ''}`}
         id="imgPopup">
      <div className="popup__container popup__container_type_img">
        <img className="popup__image"
             src={card ? card.src : '#'} alt={card ? card.alt : ''}/>
        <h2 className="popup__image-title">{card ? card.title : ''}</h2>
        <button type="button" className="popup__close-icon" onClick={onClose}/>
      </div>
    </div>
  )
}

export default ImagePopup;