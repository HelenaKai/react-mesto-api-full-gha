import PopupWithForm from "./PopupWithForm";
import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading, buttonState, onValidate, errorMessage }) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name, description });
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onValidate={onValidate}
      buttonState={buttonState}
      name="profile"
      buttonText={isLoading ? `Сохранение...` : `Сохранить`}
      title="Редактировать профиль"
    >
      <label className="popup__input-wrap">
        <input
          id="input-name"
          className="popup__input popup__input_type_name"
          type="text"
          name="name"
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          required
          value={name ?? ""}
          onChange={handleChangeName}
        />
        <span className="popup__input-error input-name-error">
          {errorMessage.name && errorMessage.name}
        </span>
      </label>

      <label className="popup__input-wrap">
        <input
          type="text"
          id="input-about"
          name="job"
          className="popup__input popup__input_type_about"
          placeholder="Описание"
          minLength="2"
          maxLength="200"
          required
          value={description ?? ""}
          onChange={handleChangeDescription}
        />
        <span className="popup__input-error input-about-error">
          {errorMessage.job && errorMessage.job}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
