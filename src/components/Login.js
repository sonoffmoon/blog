import { useEffect, useState } from "react";

const Login = ({ checkAuth }) => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuth(isLoggedIn);
  }, [isLoggedIn]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const logInUser = async (credentials) => {
      const user = await fetch(`http://127.0.0.1:5000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
        body: JSON.stringify(credentials),
      });
      console.log(user);
      const userObj = await user.json();
      console.log(userObj);

      if (userObj.status === "success") {
        checkAuth(setIsLoggedIn(true));
      } else {
        console.log(userObj.message);
      }
    };
    console.log(JSON.stringify(formData));
    logInUser(formData);
  };

  return (
    <main className="main">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>login</p>
          <input name="login" type="text" onChange={handleChange} />
        </label>
        <label>
          <p>pass</p>
          <input name="password" type="password" onChange={handleChange} />
        </label>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    </main>
  );
};

export default Login;
