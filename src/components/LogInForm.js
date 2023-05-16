import { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import PostService from "../services/PostService";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { store } = useContext(Context);
  return (
    <div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
      />
      <button onClick={() => store.login(email, password)}>LogIn</button>
      <button onClick={() => store.registration(email, password)}>
        Register
      </button>
      <button onClick={() => PostService.getAllPosts()}>Get posts</button>
    </div>
  );
};

export default observer(LogInForm);
