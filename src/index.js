import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Store from "./store/store";
// import { AuthProvider } from "./routes/Home";

import { BrowserRouter } from "react-router-dom";
import "./index.css";

const store = new Store();

export const Context = createContext({
  store,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Context.Provider value={{ store }}>
        <App />
      </Context.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
