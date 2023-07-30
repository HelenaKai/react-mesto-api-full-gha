import React from "react";
import useForm from "../hooks/useForm";
import AuthForm from "./AuthForm";
import { useEffect } from "react";
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const { values, setValues, handleChange } = useForm({});

  useEffect(() => {
    setValues({});
  }, [setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
  }

  return (
    <AuthForm
      handleChange={handleChange}
      title="Регистрация"
      buttonText="Зарегистрироваться"
      handleSubmit={handleSubmit}
      valuesEmail={values.email || ""}
      valuesPassword={values.password || ""}
    >
      <Link to="/sign-in" className="auth__link">
        Уже зарегистрированы? Войти
      </Link>
    </AuthForm>
  );
}

export default Register;












/* 

import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = data;
    onRegister({ email, password });
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <label className="auth__label">
          <input
            className="auth__input"
            type="email"
            name="email"
            placeholder="Email"
            value={data.email || ""}
            onChange={handleChange}
            required
          />
          <input
            className="auth__input"
            type="password"
            name="password"
            value={data.password || ""}
            onChange={handleChange}
            placeholder="Пароль"
            minLength={8}
            maxLength={50}
            required
          />
        </label>
        <button className="auth__submit">Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" className="auth__link">
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
}

export default Register; */
