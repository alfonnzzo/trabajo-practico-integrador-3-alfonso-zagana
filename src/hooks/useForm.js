import { useState } from "react";

export const useForm = (initialState) => {
  const [formState, setFormState] = useState(initialState);
  const { username, password } = formState;

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleReset = () => {
    setFormState(initialState);
  };

  const handleSubmit = (event, onLogin) => {

    event.preventDefault();

    handleReset();

    console.log(formState);
  };

  return {
    formState,
    ...formState,
    handleChange,
    handleSubmit,
  };
};