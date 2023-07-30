import React from "react";

function AuthForm({ title, buttonText,  valuesEmail, valuesPassword, handleSubmit, handleChange, children }) {
  return (
    <section className="auth">
      <h2 className="auth__title">{title}</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <label className="auth__label">
          <input
            className="auth__input"
            type="email"
            name="email"
            placeholder="Email"
            value={valuesEmail}
            onChange={handleChange}
            required
          />

          <input
            className="auth__input"
            type="password"
            name="password"
            value={valuesPassword}
            onChange={handleChange}
            placeholder="Пароль"
            minLength="2"
            maxLength="30"
            required
          />
        </label>

        <button type="submit" className="auth__submit">
          {buttonText}
        </button>
      </form>
      {children}
    </section>
  );
}

export default AuthForm;
