import React, { createContext } from "react";

import Home from "./routes/Home";

import "./App.css";

export const PostsContext = createContext([]);

const App = () => {
  return <Home />;
};

export default App;
