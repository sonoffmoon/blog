import React, { useState, useEffect, useRef, useContext } from "react";
import Button from "./Button";
import "../styles/DialogModal.css";
import { Context } from "..";

const DialogModal = ({ title, isOpened, onProceed, onClose, children }) => {
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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const logInUser = async (credentials) => {
    const { email, password } = credentials;
    const user = await store.login(email, password);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    logInUser(formData);
  };

  const preventAutoClose = (e) => e.stopPropagation();

  return (
    <dialog className="modal" ref={ref} onCancel={onClose} onClick={onClose}>
      <div onClick={preventAutoClose}>
        <h3 className="form-title">{title}</h3>
        {children}

        {error ? <p className="error-message">{error}</p> : ""}

        <div className="form-wrapper">
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

export default DialogModal;
