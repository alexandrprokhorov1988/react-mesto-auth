import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useFormValidation} from '../hooks/useFormValidation';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();

  React.useEffect(() => {
    if (currentUser) {
      if (isOpen) {
        resetForm(currentUser);
      }
    }
  }, [isOpen, currentUser, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm name="edit"
                   title="Редактировать профиль"
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}>
      <label className="form__label">
        <input className="form__input"
               type="text"
               name="name"
               placeholder="Ваше имя"
               minLength="2"
               maxLength="40"
               required pattern="^[а-яёА-ЯЁa-zA-Z-\s]+$"
               id="name-input"
               value={values.name || ''}
               onChange={handleChange}/>
        <span className={`form__input-error ${!isValid ? 'form__input-error_visible' : ''}`}
              id="name-input-error">{errors.name || ''}</span>
      </label>
      <label className="form__label">
        <input className="form__input"
               type="text"
               name="about"
               placeholder="Ваша профессия"
               minLength="2"
               maxLength="200"
               required id="profession-input"
               pattern="^[а-яёА-ЯЁa-zA-Z0-9-\s]+$"
               value={values.about || ''}
               onChange={handleChange}
        />
        <span className={`form__input-error ${!isValid ? 'form__input-error_visible' : ''}`}
              id="profession-input-error">{errors.about || ''}</span>
      </label>
      <input className={`form__submit-button ${!isValid ? 'form__submit-button_inactive' : ''}`}
             type="submit"
             name="submit"
             disabled={!isValid || isLoading}
             value={`${isLoading ? 'Сохранение' : 'Сохранить'}`}/>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
