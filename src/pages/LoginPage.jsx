import { Link } from "react-router";
import { useForm } from "../hooks/useForm";

export const LoginPage = () => {
  const { formState, handleChange } = useForm({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Formulario funcionando:", formState);
    alert("Funciona 👍");
  };

  return (
    <main>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario</label>
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Ingresar</button>
      </form>
    </main>
  );
};
