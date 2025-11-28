// src/pages/auth/Login.jsx
import { Link, useNavigate } from "react-router";
import { useForm } from "../../hooks/useForm";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { formState, handleChange } = useForm({
    username: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const resp = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      const data = await resp.json();

      if (!resp.ok) {
        return alert(data.message || "Error al iniciar sesión");
      }

      alert("Inicio de sesión exitoso");
      navigate("/home");
    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <main className="bg-blue-200 h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleChange}
            placeholder="Usuario"
            className="w-full border px-3 py-2 rounded-lg"
          />

          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className="w-full border px-3 py-2 rounded-lg"
          />

          <p className="text-center text-sm mt-2">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-blue-600">
              Regístrate
            </Link>
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-3"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </main>
  );
};
