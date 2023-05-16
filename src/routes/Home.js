import { createContext, useContext, useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Header from "../components/Header";
import Posts from "../components/Posts";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import Login from "../components/Login";
import Footer from "../components/Footer";

// Create a context for auth
const AuthContext = createContext();

// Create a custom hook for using the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// This is a component that provides auth context to its children
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth-check", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setAuth(data.isAuthenticated);
      } catch (err) {
        console.log(err);
        setAuth(false);
      }
    };

    checkAuth();
  }, []);

  const value = { auth, setAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const Home = () => {
  const { auth, setAuth } = useAuth();

  if (auth === null) {
    return null; // Don't render anything until auth is either true or false
  }

  return (
    <>
      <Routes>
        <Route element={<Header auth={auth} setAuth={setAuth} />}>
          <Route
            path="/login"
            element={
              Boolean(auth) ? (
                <Navigate to={"/"} />
              ) : (
                <Login setAuth={setAuth} />
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
