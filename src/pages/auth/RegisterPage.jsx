import { Link, useNavigate } from "react-router";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <main className="bg-linear-to-br from-blue-300 to-blue-200 h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Registro
          </h2>

          <form className="space-y-6" onSubmit={handleRegister}>
            <input
              type="text"
              name="firstname"
              placeholder="Nombre"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="text"
              name="lastname"
              placeholder="Apellido"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="text"
              name="username"
              placeholder="Usuario"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="number"
              name="dni"
              placeholder="DNI"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <span className="flex justify-center gap-1">
              <p>¿Ya tienes una cuenta?</p>
              <Link to="/login" className="text-blue-500">
                Inicia sesión
              </Link>
            </span>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
