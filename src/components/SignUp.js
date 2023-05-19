import React, { useState, useEffect, useRef, useContext } from "react";
import Button from "./Button";
import "../styles/DialogModal.css";
import { Context } from "..";

const SignUp = ({ title, isOpened, onProceed, onClose, children }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [error, setError] = useState(false);

  const { store } = useContext(Context);
  const ref = useRef(null);

  useEffect(() => {
    if (isOpened) {
      ref.current.showModal();
      document.body.classList.toggle("modal-open");
    } else {
      ref.current.close();
      document.body.classList.toggle("modal-open");
    }
  }, [isOpened]);

  const signUpUser = async (credentials) => {
    const { email, password, repeatPassword } = credentials;
    const user = await store.registration(email, password, repeatPassword);
    if (user.error) {
      const regex = /<pre>(.*?)<\/pre>/s;
      const matches = user.error.match(regex);
      setError(matches[1]);
    } else {
      setFormData({
        email: "",
        password: "",
      });
      setError(false);
      onClose();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signUpUser(formData);
  };

  const preventAutoClose = (e) => e.stopPropagation();

  return (
    <dialog className="modal" ref={ref} onCancel={onClose} onClick={onClose}>
      <div onClick={preventAutoClose}>
        <h3>{title}</h3>
        {children}

        {error ? <p className="error-message">{error}</p> : ""}

        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <label>
              <p>Email</p>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label>
              <p>Password</p>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            <label>
              <p>Repeat password</p>
              <input
                name="repeatPassword"
                type="password"
                value={formData.repeatPassword}
                onChange={handleChange}
              />
            </label>
            <div className="modal-controls">
              <Button type="submit" onClick={onProceed} caption={"Proceed"} />
              <Button
                className={"btn-close"}
                type="button"
                onClick={onClose}
                caption={"Close"}
              />
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default SignUp;
