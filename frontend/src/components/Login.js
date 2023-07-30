import React from "react";
import useForm from "../hooks/useForm";
import AuthForm from "./AuthForm";
import { useEffect } from "react";

function Login({ onLogin }) {
  const { values, setValues,  handleChange } = useForm({});

  useEffect(() => {
    setValues({});
  }, [setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values);
  }

  return (
    <AuthForm
      handleChange={handleChange}
      title="Вход"
      buttonText="Войти"
      handleSubmit={handleSubmit}
      valuesEmail={values.email || ""}
      valuesPassword={values.password || ""}
    />
  );
}

export default Login;









