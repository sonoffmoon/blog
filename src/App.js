import React, { createContext, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Post from "./components/Post";
import Footer from "./components/Footer";

import Posts from "./components/Posts";
import NewPost from "./components/NewPost";

import "./App.css";

export const PostsContext = createContext([]);

const App = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme) {
      document.body.setAttribute("data-theme", currentTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
    }
  }, []);

  if (store.isLoading) {
    return "";
  }

  return (
    <>
      <Routes>
        <Route element={<Header />}>
          <Route index path="/" element={<Posts />} />
          <Route path={"/posts/:id"} element={<Post />} />
          {store.isAuth ? <Route path="/new" element={<NewPost />} /> : ""}
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default observer(App);
