import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import { PostsProvider } from "./providers/PostsProvider";

import AppRouter from "./AppRouter";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <PostsProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </PostsProvider>
  </AuthProvider>
);
