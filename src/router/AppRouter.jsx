import { Routes, Route, Navigate } from "react-router";
import { LoginPage } from "../pages/auth/LoginPage";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { PublicRoutes } from "./PublicRouter";
import { PrivateRoutes } from "./PrivateRouter";
import { TaskPage } from "../pages/TaskPage";
import { ProfilePage } from "../pages/ProfilePage";


export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path="home" element={<HomePage />} />
        <Route path="tasks" element={<TaskPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
