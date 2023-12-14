import React from "react";
import Navbar from "../components/Navbar";
import PostList from "../components/PostList";

export const HomePage = () => {
  return (
    <div className="container">
      <Navbar />
      <h1> Travel Posts</h1>
      <div className="container-fluyd">
        <PostList />
      </div>
    </div>
  );
};
