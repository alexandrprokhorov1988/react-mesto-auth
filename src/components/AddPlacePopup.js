import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
    setName('');
    setLink('');
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
                 value={name}
                 onChange={handleChangeName}/>
          <span className="form__input-error"
                id="imgName-input-error"/>
        </label>
        <label className="form__label">
          <input className="form__input"
                 type="url"
                 name="link"
                 placeholder="Ссылка на картинку"
                 required
                 id="link-input"
                 value={link}
                 onChange={handleChangeLink}/>
          <span className="form__input-error"
                id="link-input-error"/>
        </label>
        <input className="form__submit-button"
               type="submit"
               name="submit"
               disabled={isLoading}
               value={`${isLoading ? 'Сохранение' : 'Создать'}`}
        />
      </PopupWithForm>
  );
}

export default AddPlacePopup;