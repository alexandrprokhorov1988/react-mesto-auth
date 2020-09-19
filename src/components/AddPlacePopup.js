import React from 'react';
import PopupWithForm from './PopupWithForm';
import {useFormValidation} from '../hooks/useFormValidation';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  return (
    <PopupWithForm name="add"
                   title="Новое место"
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleAddPlaceSubmit}>
      <label className="form__label">
        <input className="form__input"
               type="text"
               name="name"
               placeholder="Название"
               minLength="1"
               maxLength="30"
               required id="imgName-input"
               pattern="^[а-яёА-ЯЁa-zA-Z0-9-\s]+$"
               value={values.name || ''}
               onChange={handleChange}/>
        <span className={`form__input-error ${!isValid ? 'form__input-error_visible' : ''}`}
              id="imgName-input-error">{errors.name || ''}</span>
      </label>
      <label className="form__label">
        <input className="form__input"
               type="url"
               name="link"
               placeholder="Ссылка на картинку"
               required
               id="link-input"
               value={values.link || ''}
               onChange={handleChange}
        />
        <span className={`form__input-error ${!isValid ? 'form__input-error_visible' : ''}`}
              id="link-input-error">{errors.link || ''}</span>
      </label>
      <input className={`form__submit-button ${!isValid ? 'form__submit-button_inactive' : ''}`}
             type="submit"
             name="submit"
             disabled={!isValid || isLoading}
             value={`${isLoading ? 'Сохранение' : 'Создать'}`}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;