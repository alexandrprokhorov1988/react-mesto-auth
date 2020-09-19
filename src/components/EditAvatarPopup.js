import React from 'react';
import PopupWithForm from './PopupWithForm';
import {useFormValidation} from '../hooks/useFormValidation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = React.useRef();
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = '';
  }

  return (
    <PopupWithForm name="avatar"
                   title="Обновить аватар"
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}>
      <label className="form__label">
        <input className="form__input"
               type="url"
               name="avatarUrl"
               placeholder="Ссылка на аватар"
               required
               id="avatarUrl-input"
               value={values.avatarUrl || ''}
               onChange={handleChange}
               ref={avatarRef}
        />
        <span className={`form__input-error ${!isValid ? 'form__input-error_visible' : ''}`}
              id="avatarUrl-input-error">{errors.avatarUrl || ''}</span>
      </label>
      <input className={`form__submit-button ${!isValid ? 'form__submit-button_inactive' : ''}`}
             type="submit"
             name="submit"
             disabled={!isValid || isLoading}
             value={`${isLoading ? 'Сохранение' : 'Сохранить'}`}/>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;