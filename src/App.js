import React, { createContext, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Header from "./components/Header";
import Post from "./components/Post";
import Footer from "./components/Footer";

import Posts from "./components/Posts";
import Home from "./routes/Home";
import LogInForm from "./components/LogInForm";
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

  if (store.isLoading) {
    return <h1>LOADING</h1>;
  }

  // if (!store.isAuth) {
  //   return <LogInForm />;
  // }

  return (
    // <div>
    //   <h1>
    //     {store.isAuth ? `Logged in: ${store.user.email}` : "Please authorize"}
    //   </h1>
    //   <button onClick={() => store.logout()}>Log out</button>
    // </div>
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
