import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Loading } from "../components/Loading";

export const ProfilePage = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUserData(data.user);
      } else {
        console.error("Error al obtener perfil, cerrando sesión");
        onLogout();
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      onLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogoutClick = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión en el backend:", error);
    } finally {
      onLogout();
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-20 flex flex-col items-center">
      <section className="relative w-full max-w-xl bg-zinc-900/60 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-zinc-800">
        {loading && <Loading />}

        {/* Encabezado */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-4xl font-bold shadow-lg shadow-red-600/30">
            {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
          </div>
          <h1 className="text-3xl font-semibold mt-4">
            {userData?.name
              ? `${userData.name} ${userData.lastname}`
              : "Mi Perfil"}
          </h1>
          <p className="text-zinc-400 text-sm mt-1">Información personal</p>
        </div>

        <hr className="border-zinc-700 mb-8" />

        {/* Datos del perfil */}
        {!loading && userData && (
          <div className="space-y-5">
            {/* ID */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-zinc-950 border border-zinc-800 rounded-xl p-4">
              <span className="text-zinc-400 text-sm mb-1 sm:mb-0">
                ID de Usuario
              </span>
              <p className="text-white font-medium text-sm text-right break-all">
                {userData.id}
              </p>
            </div>

            {/* Nombre */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-zinc-950 border border-zinc-800 rounded-xl p-4">
              <span className="text-zinc-400 text-sm mb-1 sm:mb-0">Nombre</span>
              <p className="text-white font-medium text-sm text-right">
                {userData.name}
              </p>
            </div>

            {/* Apellido */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-zinc-950 border border-zinc-800 rounded-xl p-4">
              <span className="text-zinc-400 text-sm mb-1 sm:mb-0">
                Apellido
              </span>
              <p className="text-white font-medium text-sm text-right">
                {userData.lastname}
              </p>
            </div>

            {/* Correo (opcional) */}
            {userData.email && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                <span className="text-zinc-400 text-sm mb-1 sm:mb-0">
                  Correo
                </span>
                <p className="text-white font-medium text-sm text-right break-all">
                  {userData.email}
                </p>
              </div>
            )}

            {/* Botón Logout */}
            <button
              onClick={handleLogoutClick}
              className="w-full py-2.5 mt-6 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition shadow-lg shadow-red-600/20"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

