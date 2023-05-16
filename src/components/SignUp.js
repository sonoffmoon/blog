import React, { useState, useEffect, useRef, useContext } from "react";
import Button from "./Button";
import "../styles/DialogModal.css";
import { Context } from "..";

const SignUp = ({ title, isOpened, onProceed, onClose, children }) => {
  const { store } = useContext(Context);
  const ref = useRef(null);

  useEffect(() => {
    if (isOpened) {
      ref.current.showModal();
      document.body.classList.add("modal-open");
    } else {
      ref.current.close();
      document.body.classList.remove("modal-open");
    }
  }, [isOpened]);

  const proceedAndClose = () => {
    onProceed();
    onClose();
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const logInUser = async (credentials) => {
      const { email, password } = credentials;
      const user = await store.registration(email, password);
    };

    logInUser(formData);
  };

  const preventAutoClose = (e) => e.stopPropagation();

  return (
    <dialog className="modal" ref={ref} onCancel={onClose} onClick={onClose}>
      <div onClick={preventAutoClose}>
        <h3>{title}</h3>
        {children}

        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <label>
              <p>Email</p>
              <input name="email" type="email" onChange={handleChange} />
            </label>
            <label>
              <p>Password</p>
              <input name="password" type="password" onChange={handleChange} />
            </label>
            <div className="modal-controls">
              <Button
                type="submit"
                onClick={proceedAndClose}
                caption={"Proceed"}
              />
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
