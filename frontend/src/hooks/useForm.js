import { useState, useCallback } from "react";

 function useForm(inputValues) {
    const [values, setValues] = useState({});;
 
  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });      // универсальный обработчик полей
  };

  const resetForm = useCallback(
    (newValues = {}) => {
      setValues(newValues);
    },
    [setValues]
  );

  return { values,  handleChange, resetForm, setValues };
}

export default useForm;


