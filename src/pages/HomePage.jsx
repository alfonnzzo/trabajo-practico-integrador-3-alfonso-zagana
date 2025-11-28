import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Loading } from "../components/Loading";

export const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Funcion para cargar ambos datos (perfil y tareas)
  const loadHomeData = async () => {
    try {
      // Definimos las promesas de las peticiones
      const profilePromise = fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      const tasksPromise = fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });

      // Ejecutamos ambas peticiones al mismo tiempo
      const [profileRes, tasksRes] = await Promise.all([
        profilePromise,
        tasksPromise,
      ]);

      // Procesamos los datos del perfil
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setUserData(profileData.user);
      } else {
        console.error("Error al cargar el perfil");
      }

      // Procesamos los datos de las tareas
      if (tasksRes.ok) {
        const tasksData = await tasksRes.json();
        // Normalización para asegurar que 'tasks' sea un array
        const fetchedTasks =
          tasksData.tasks || (Array.isArray(tasksData) ? tasksData : []);
        setTasks(fetchedTasks);
      } else {
        console.error("Error al cargar las tareas");
      }
    } catch (error) {
      console.error("Error en las peticiones de Home:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  // Calculos de estadisticas (Variables calculadas)
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.is_completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Renderizado Condicional de Carga
  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white p-8 relative">
        <Loading />
      </main>
    );
  }

  // Renderizado del Contenido Principal
  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-16">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-10">
          Bienvenido,{" "}
          <span className="text-red-500">{userData?.name || "Usuario"}</span>
        </h1>

        {/* Contenedor de Estadisticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Total Tareas */}
          <div className="bg-zinc-900/60 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-zinc-800 text-center">
            <h3 className="text-5xl font-bold text-red-500">{totalTasks}</h3>
            <p className="text-lg text-zinc-400 mt-2">Total de Tareas</p>
          </div>

          {/* Tareas Completadas */}
          <div className="bg-zinc-900/60 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-zinc-800 text-center">
            <h3 className="text-5xl font-bold text-green-500">
              {completedTasks}
            </h3>
            <p className="text-lg text-zinc-400 mt-2">Completadas</p>
          </div>

          {/* Tareas Pendientes */}
          <div className="bg-zinc-900/60 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-zinc-800 text-center">
            <h3 className="text-5xl font-bold text-yellow-500">
              {pendingTasks}
            </h3>
            <p className="text-lg text-zinc-400 mt-2">Pendientes</p>
          </div>
        </div>

        {/* Ir a Tareas */}
        <div className="text-center">
          <Link
            to="/tasks"
            className="py-3 px-8 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition shadow-lg shadow-red-600/20 text-lg"
          >
            Ir a mis Tareas
          </Link>
        </div>
      </div>
    </main>
  );
};

