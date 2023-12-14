import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import PrivateRoutes from "./components/PrivateRoutes";
import NewPostForm from "./components/NewPostForm";
import NotFoundPage from "./pages/NotFoundPage";
import EditPostForm from "./components/EditPostForm";

function AppRouter() {
  return (
    <Routes>
      {/*public routes */}

      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />

      
        <Route path="/" element={<HomePage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="post/new" element={<NewPostForm />} />
          <Route path="post/edit/:postId" element={<EditPostForm />} />
        </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
