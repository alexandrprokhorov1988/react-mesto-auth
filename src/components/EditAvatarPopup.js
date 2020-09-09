import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
  const avatarRef = React.useRef();

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
               ref={avatarRef}/>
        <span className="form__input-error"
              id="avatarUrl-input-error"/>
      </label>
      <input className="form__submit-button"
             type="submit"
             name="submit"
             disabled={isLoading}
             value={`${isLoading ? 'Сохранение' : 'Сохранить'}`}/>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;