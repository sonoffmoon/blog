import React, { useState, useEffect, useRef, useContext } from "react";
import Button from "./Button";
import "../styles/DialogModal.css";
import { Context } from "..";

const SignIn = ({ closeModal }) => {
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { store } = useContext(Context);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    logInUser(formData);
  };

  const handleModalClick = (event) => {
    if (event.target.classList.contains("modal-background")) {
      closeModal();
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const logInUser = async (credentials) => {
    const { email, password } = credentials;
    console.log(email, password);
    const user = await store.login(email, password);
    console.log(user);
    if (user.error) {
      const regex = /<pre>(.*?)<\/pre>/s;
      const matches = user.error.match(regex);
      if (!matches) {
        setError(user.error);
      }
      setError(matches[1]);
    } else {
      setFormData({
        email: "",
        password: "",
      });
      setError(false);
      closeModal();
    }
  };
  return (
    <div className="modal-background" onClick={handleModalClick}>
      <div className="modal">
        <div className="form-wrapper">
          <h2 className="form-title">Log In</h2>

          {error ? <p className="error-message">{error}</p> : ""}

          <form onSubmit={handleSubmit}>
            <label className="field" htmlFor="email">
              <p>Email</p>
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label className="field" htmlFor="password">
              <p>Password</p>
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="modal-controls">
              <Button
                type="submit"
                onClick={console.log("click3")}
                caption={"Proceed"}
              />
              <Button
                className={"btn-close"}
                type="button"
                onClick={closeModal}
                caption={"Close"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;