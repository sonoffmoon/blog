import { useState, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import DialogModal from "./SingIn";
import SignUp from "./SignUp";
import Button from "./Button";
import SignIn from "./SingIn";

import { RxMoon } from "react-icons/rx";

import "../styles/Header.css";

const Header = () => {
  const { store } = useContext(Context);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const openSignIn = () => {
    setIsSignInOpen(true);
  };

  const closeSignIn = () => {
    setIsSignInOpen(false);
  };

  const openSignUp = () => {
    setIsSignUpOpen(true);
  };

  const closeSignUp = () => {
    setIsSignUpOpen(false);
  };

  const changeTheme = () => {
    if (document.body.dataset.theme === "dark") {
      document.body.dataset.theme = "light";
      localStorage.setItem("theme", "light");
    } else {
      document.body.dataset.theme = "dark";
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <>
      <header className="header">
        <Link to="/">
          <h1 className="main-header">
            <RxMoon height={"48"} width={"48"} className={"logo-icon"} />
            <span>moon son's blog</span>
          </h1>
        </Link>
        <div className="wrapper">
          <div className="controls">
            {store.isAuth ? <p className="email">{store.user.email}</p> : ""}

            {store.isAuth ? (
              <Link to="/new">
                <div className="btn-create-post">
                  <ion-icon name="add-outline"></ion-icon>
                </div>
              </Link>
            ) : (
              ""
            )}

            {store.isAuth ? (
              <Button
                type={"button"}
                onClick={() => store.logout()}
                caption={"Log out"}
              />
            ) : (
              <>
                <Button
                  type={"button"}
                  onClick={openSignIn}
                  caption={"Log in"}
                />
                <Button
                  type={"button"}
                  onClick={openSignUp}
                  caption={"Sign up"}
                />
              </>
            )}
            <Button
              type={"button"}
              onClick={() => changeTheme()}
              caption={"Theme"}
            />
          </div>
        </div>

        {isSignInOpen && <SignIn closeModal={closeSignIn} />}
        {isSignUpOpen && <SignUp closeModal={closeSignUp} />}
      </header>
      <Outlet />
    </>
  );
};

export default observer(Header);
