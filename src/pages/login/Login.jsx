// import { useState } from "react";
// import axios from "axios";
// import { StoreContext } from "../../context/StoreContext";

// const Login = () => {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

// const handleLogin = async () => {
//   try {
//     const res = await axios.post(
//       "http://localhost:5000/api/auth/login",
//       {
//         email,
//         password
//       }
//     );

//     localStorage.setItem("token", res.data.token);
//   } catch (err) {
//     console.error(err.response?.data || err.message);
//   }
// };

//   return (
//     <>
//       <input onChange={(e) => setEmail(e.target.value)} />
//       <input
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </>
//   );
// };

// export default Login;


import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.post("/api/auth/login", { email, password });
    login(res.data);
    navigate("/checkout");
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-20">
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
};

export default Login;
