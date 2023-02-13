import { useState } from "react";

import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Header from "../components/Header";
import Posts from "../components/Posts";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import Login from "../components/Login";
import Footer from "../components/Footer";

const Home = () => {
  const [auth, setAuth] = useState(false);
  const checkAuth = (status) => {
    setAuth(status);
  };

  return (
    <>
      <Routes>
        <Route element={<Header auth={auth} />}>
          <Route
            path="/login"
            element={
              Boolean(auth) ? (
                <Navigate to={"/"} />
              ) : (
                <Login checkAuth={checkAuth} />
              )
            }
          />
          <Route index path="/" element={<Posts />} />
          <Route path={"/posts/:id"} element={<Post />} />
          {auth === true ? <Route path="/new" element={<NewPost />} /> : ""}
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default Home;
