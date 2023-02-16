import { useEffect, useState } from "react";

const Login = ({ checkAuth }) => {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuth(isLoggedIn);
  }, [isLoggedIn]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const logInUser = async (credentials) => {
      const user = await fetch("https://sunoffmoon-blog.fly.dev/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
        body: JSON.stringify(credentials),
      });
      const userObj = await user.json();

      if (userObj.status === "success" && Boolean(userObj.token)) {
        checkAuth(setIsLoggedIn(true));
      }
    };
    logInUser({ login, password });
    setLogin(undefined);
    setPassword(undefined);
  };

  return (
    <main className="main">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>login</p>
          <input
            type="text"
            onChange={(event) => setLogin(event.target.value)}
          />
        </label>
        <label>
          <p>pass</p>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    </main>
  );
};

export default Login;
