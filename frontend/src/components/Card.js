import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  //Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id; 
  const cardDeleteButtonClassName = `card__delete ${
    isOwn ? "card__delete_hidden" : ""
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((like) => like._id === currentUser._id); 
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img
        className="card__img"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        {
          <button
            type="button"
            className={cardDeleteButtonClassName}
            onClick={handleCardDelete}
          ></button>
        }

        <div className="card__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
          ></button>

          <div className="card__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
