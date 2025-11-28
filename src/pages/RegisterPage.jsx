import { Link } from "react-router";

export const RegisterPage = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    alert("Formulario funcionando");
  };

  return (
    <main>
      <h1>Registro</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label>Nombre</label>
          <input type="text" name="name" />
        </div>

        <div>
          <label>Apellido</label>
          <input type="text" name="lastname" />
        </div>

        <div>
          <label>Email</label>
          <input type="email" name="email" />
        </div>

        <div>
          <label>Usuario</label>
          <input type="text" name="username" />
        </div>

        <div>
          <label>Contraseña</label>
          <input type="password" name="password" />
        </div>

        <p>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>

        <button type="submit">Registrarse</button>
      </form>
    </main>
  );
};
