import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "../../hooks/useForm";
import { Loading } from "../../components/Loading";

export const RegisterPage = ({ onLoginSuccess }) => {
  const { values, handleChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dni: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: values.firstname,
      lastname: values.lastname,
      username: values.username,
      email: values.email,
      password: values.password,
    };

    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        onLoginSuccess();
      } else {
        alert(data.message || "Error en el registro");
        handleReset();
      }
    } catch (err) {
      console.error(err);
      alert("Error al conectar con el servidor");
      handleReset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 text-white py-12">
      {loading && <Loading />}
      <div className="w-full max-w-md bg-zinc-900/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-zinc-800">
        {/* Encabezado */}
        <h2 className="text-3xl font-semibold text-center mb-2 text-white tracking-tight">
          Crear cuenta
        </h2>
        <p className="text-center text-sm text-zinc-400 mb-8">
          Completa los campos para registrarte
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Usuario */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-zinc-400 mb-1"
            >
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Nombre de usuario"
              value={values.username}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500
                         focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-400 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={values.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500
                         focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-400 mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={values.password}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500
                         focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
              required
            />
          </div>

          {/* Nombre y Apellido */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-zinc-400 mb-1"
              >
                Nombre
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                placeholder="Alfonso"
                value={values.firstname}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500
                           focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                required
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-zinc-400 mb-1"
              >
                Apellido
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Zagaña"
                value={values.lastname}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500
                           focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          {/* DNI */}
          <div>
            <label
              htmlFor="dni"
              className="block text-sm font-medium text-zinc-400 mb-1"
            >
              DNI
            </label>
            <input
              id="dni"
              name="dni"
              type="text"
              placeholder="12345678"
              value={values.dni}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500
                         focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
              required
            />
          </div>

          {/* Boton */}
          <button
            type="submit"
            className="w-full py-2.5 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition
                       shadow-lg shadow-red-600/20"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        {/* Login */}
        <p className="text-center text-sm text-zinc-500 mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-red-500 hover:text-red-400 cursor-pointer transition font-medium"
          >
            Iniciar Sesion
          </Link>
        </p>
      </div>
    </main>
  );
};
