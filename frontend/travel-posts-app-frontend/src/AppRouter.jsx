import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import PrivateRoutes from "./components/PrivateRoutes";
import NewPostForm from "./components/NewPostForm";
import NotFoundPage from "./pages/NotFoundPage";
import EditPostForm from "./components/EditPostForm";
import PostPage from "./pages/PostPage";
import NewCommentForm from "./components/NewCommentForm";
import EditCommentForm from "./components/EditCommentForm";

function AppRouter() {
  return (
    <Routes>
      {/*public routes */}

      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="post/:postId" element={<PostPage />} />

      
        {/*Private routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="post/new" element={<NewPostForm />} />
          <Route path="post/edit/:postId" element={<EditPostForm />} />
          <Route path="comment/new/:postId" element={<NewCommentForm />} />
          <Route path="comment/edit/:postId" element={<EditCommentForm />} />
        </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
