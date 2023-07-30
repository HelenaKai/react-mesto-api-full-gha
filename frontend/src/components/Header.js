import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import logo from "../images/mesto-logo.svg";

function Header(props) {
  const { userEmail, logOut } = props;
 
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип интерактивного сервиса Mesto Russia"
      />

      <Routes>
        <Route
          path="/"
          element={
            <div className="header__info">
              <p className="header__email">{userEmail}</p>

              <button
                className="header__link header__button-logout"
                onClick={logOut}
              >
                Выйти
              </button>
            </div>
          }
        />

        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link header__button-logout">
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link header__button-logout">
              Регистрация
            </Link>
          }
        />
      </Routes>
      
    </header>
  );
}

export default Header;
