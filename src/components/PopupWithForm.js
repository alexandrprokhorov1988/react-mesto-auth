import React from 'react';

function PopupWithForm({isOpen, name, title, onClose, children, onSubmit}) {

  return (
    <div className={`popup popup_type_form ${isOpen ? 'popup_opened' : ''}`} id={`${name}Popup`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button type="button" className="popup__close-icon" onClick={onClose}/>
        <h2 className="form__title">{title}</h2>
        <form action="#" onSubmit={onSubmit} className="form" id={`${name}Form`} data-form={name} method="get"
              noValidate>
          {children}
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;