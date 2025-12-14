import { useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password
      }
    );

    localStorage.setItem("token", res.data.token);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};

  return (
    <>
      <input onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </>
  );
};

export default Login;
