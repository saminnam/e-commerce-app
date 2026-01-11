import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Mail, Lock, LogIn } from "lucide-react";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        login(res.data.user);
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Login to continue shopping
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-5 text-center">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-yellow-500">
            <Mail size={18} className="text-gray-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full outline-none bg-transparent text-gray-700"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-yellow-500">
            <Lock size={18} className="text-gray-400" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full outline-none bg-transparent text-gray-700"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full cursor-pointer flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-white transition ${
            loading
              ? "bg-yellow-400 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          <LogIn size={18} />
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        {/* <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span className="text-yellow-600 font-medium cursor-pointer hover:underline">
            Sign up
          </span>
        </p> */}
      </form>
    </section>
  );
};

export default LoginPage;
