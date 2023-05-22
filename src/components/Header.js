import { useState, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import DialogModal from "./DialogModal";
import SignUp from "./SignUp";
import Button from "./Button";

import { RxMoon } from "react-icons/rx";

import "../styles/Header.css";

const Header = () => {
  const { store } = useContext(Context);
  const [isLogInOpened, setIsLogInOpened] = useState(false);
  const [isSignUpOpened, setIsSignUpOpened] = useState(false);

  const changeTheme = () => {
    if (document.body.dataset.theme === "dark") {
      document.body.dataset.theme = "light";
      localStorage.setItem("theme", "light");
    } else {
      document.body.dataset.theme = "dark";
      localStorage.setItem("theme", "dark");
    }
  };

  console.log(document.body.dataset);
  const onProceed = () => {};
  return (
    <>
      <header className="header">
        <Link to="/">
          <h1 className="main-header">
            <RxMoon height={"48"} width={"48"} className={"logo-icon"} />
            moon son's blog
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
                  onClick={() => setIsLogInOpened(true)}
                  caption={"Log in"}
                />
                <Button
                  type={"button"}
                  onClick={() => setIsSignUpOpened(true)}
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

          <nav>
            <ul className="contacts">
              <li>
                <a className="contact-link" href="https://twitter.com/">
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
              </li>
              <li>
                <a className="contact-link" href="https://medium.com/">
                  <ion-icon name="logo-medium"></ion-icon>
                </a>
              </li>
              <li>
                <a
                  className="contact-link"
                  href="https://github.com/sonoffmoon"
                >
                  <ion-icon name="logo-github"></ion-icon>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <DialogModal
          title="Log In"
          isOpened={isLogInOpened}
          onProceed={onProceed}
          onClose={() => setIsLogInOpened(false)}
        >
          <p>To close: click Close, press Escape, or click outside.</p>
        </DialogModal>

        <SignUp
          title="Sign up"
          isOpened={isSignUpOpened}
          onProceed={onProceed}
          onClose={() => setIsSignUpOpened(false)}
        >
          <p>To close: click Close, press Escape, or click outside.</p>
        </SignUp>
      </header>
      <Outlet />
    </>
  );
};

export default observer(Header);
