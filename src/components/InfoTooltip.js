import React from 'react';
import success from '../images/info-tool-tip-success.svg';
import failure from '../images/info-tool-tip-failure.svg';

function InfoTooltip({ onClose, isOpen, isSuccess }) {

  return (
    <div className={`popup popup_type_form ${isOpen ? 'popup_opened' : ''}`} id={'infoTooltipPopup'}>
      <div className={`popup__container popup__container_type_infoTooltip`}>
        <button type="button" className="popup__close-icon" onClick={onClose}/>
        <img src={isSuccess ? success : failure}
             alt={isSuccess ? "Успешная регистрация." : "Ошибка при регистрации"}
             className="popup__image_type_infoTooltip"/>
        <h2 className="popup__title_type_infoTooltip">
          {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
