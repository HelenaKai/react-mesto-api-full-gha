import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props) {
  const { isOpen, onClose, isLoading, onSubmit, card } = props;

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="popup-confirmation"
      title="Вы уверены?"
      buttonText={isLoading ? `Удаление...` : `Да`}
    ></PopupWithForm>
  );
}

export default ConfirmDeletePopup;
