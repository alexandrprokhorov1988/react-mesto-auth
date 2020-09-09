import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({onClose, isOpen, onCardDelete, isLoading}) {

  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete();
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input type="submit"
             className="form__submit-button form__submit-button_type_confirm"
             disabled={isLoading}
             value={`${isLoading ? 'Удаление' : 'Да'}`}/>
    </PopupWithForm>
  );
}

export default ConfirmPopup;