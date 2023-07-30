function ImagePopup({ isOpen, onClose, card }) {
//console.log('props', props)

return (
    <section className={`popup popup_modal ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container-img">
        <button
          type="button"
          className="popup__close popup__close-img"
          onClick={onClose}
        ></button>
        <img className="popup__img" 
            src={card.link}
            alt={card.name}
        />
        <h2 className="popup__title-img">{card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;

