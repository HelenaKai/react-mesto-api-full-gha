import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const {
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
    onCardLike,
    onCardDelete,
    cards,
  } = props;
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div
          className="profile__avatar"
          aria-label="Открыть попап редактирования аватара"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        >
          <button
            className="profile__avatar-button"
            type="button"
            onClick={onEditAvatar}
          ></button>
        </div>

        <div className="profile__info">
          <div className="profile__info-wrap">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
          </div>
          <h2 className="profile__subtitle">{currentUser.about}</h2>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="cards" aria-label="Галерея фотографий">
        <ul className="cards__list">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardLike={onCardLike}
                onCardClick={onCardClick}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
