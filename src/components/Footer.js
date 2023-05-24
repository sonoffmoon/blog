import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrapper">
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
            <a className="contact-link" href="https://github.com/sonoffmoon">
              <ion-icon name="logo-github"></ion-icon>
            </a>
          </li>
        </ul>
      </div>
      <a href="mailto:#">
        <ion-icon class={"mailto-icon"} name="mail-outline"></ion-icon>
      </a>
    </footer>
  );
};

export default Footer;
