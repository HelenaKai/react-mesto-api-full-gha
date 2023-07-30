import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function AddPlacePopup(props) {
  const {isOpen, onClose, onAddPlace, isLoading, buttonState, onValidate, errorMessage} = props;  
  const { values,  handleChange, resetForm } = useForm({name: '', link: ''});

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link
    });
  }

  useEffect(() => {
    if (!isOpen){
      resetForm();
    }
}, [isOpen, resetForm])
 
/* 
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState(""); */

/*   useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [isOpen]);

  function hundleChangeCardName(evt) {
    setCardName(evt.target.value);
  }

  function hundleChangeCardLink(evt) {
    setCardLink(evt.target.value);
  } */


  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonState={buttonState}
      onValidate={onValidate}
      buttonText={isLoading ? `Сохранение` : `Создать`}
    >
      <label className="popup__input-wrap">
        <input
          id="input-img-title"
          className="popup__input popup__input_type_name popup__input_img-title"
          type="text"
          name="name"
          placeholder="Название места"
          value={values.name || ''}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__input-error input-img-title-error">
          {errorMessage.name && errorMessage.name}
        </span>
      </label>

      <label className="popup__input-wrap">
        <input
          id="input-url"
          className="popup__input popup__input_type_about popup__input-url"
          type="url"
          name="link"
          placeholder="Ссылка на изображение"
          value={values.link || ''}
          onChange={handleChange}
          required
        />
        <span className="popup__input-error input-url-error">
          {errorMessage.link && errorMessage.link}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
