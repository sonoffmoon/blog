import { Link, Outlet } from "react-router-dom";

import { RxMoon } from "react-icons/rx";

import "../styles/Header.css";

const Header =({ auth }) => {
  return (
    <>
      <header className="header">
        <nav>
          <Link to="/">
            <h1 className="main-header">
              <RxMoon height={"48"} width={"48"} className={"logo-icon"} />
              moon son's blog
            </h1>
          </Link>
          {auth ? (
            <Link to="/new">
              <div class="btn-create-post">
                <ion-icon name="add-outline"></ion-icon>
              </div>
            </Link>
          ) : (
            ""
          )}

          <ul class="contacts">
            <li>
              <a class="contact-link" href="https://twitter.com/">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>
            <li>
              <a class="contact-link" href="https://medium.com/">
                <ion-icon name="logo-medium"></ion-icon>
              </a>
            </li>
            <li>
              <a class="contact-link" href="https://github.com/sonoffmoon">
                <ion-icon name="logo-github"></ion-icon>
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
