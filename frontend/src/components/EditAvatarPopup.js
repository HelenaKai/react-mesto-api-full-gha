import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading, buttonState, onValidate, errorMessage }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonState={buttonState}
      onValidate={onValidate}
      name="avatar"
      title="Обновить аватар"
      buttonText={isLoading ? `Сохранение...` : `Сохранить`}
    >
      <label className="popup__input-wrap">
        <input
          id="input-avatar"
          className="popup__input popup__input_type_avatar"
          type="url"
          name="avatar"
          placeholder="Ссылка на изображение аватарки"
          minLength="2"
          required
          ref={avatarRef}
        />
        <span className="popup__input-error input-avatar-error">
          {errorMessage.avatar && errorMessage.avatar}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
