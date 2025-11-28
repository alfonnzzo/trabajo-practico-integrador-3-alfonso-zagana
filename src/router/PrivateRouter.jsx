import { Navigate, Outlet } from "react-router";
import { Navbar } from "../components/NavBar";

export const PrivateRoutes = () => {
  const isLogged = localStorage.getItem("token");

  return isLogged ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};