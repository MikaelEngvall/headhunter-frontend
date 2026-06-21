import { useState } from "react";
import { authorize } from "../security/authorize.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setIsAuthorized }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setLoginError(false);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        { email, password },
        {
          headers: {
            Authorization: `Basic ${btoa(`${email}:${password}`)}`,
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("headhunter-token", response.data.data.token);
      setIsAuthorized(authorize());
      navigate("/myPage");
    } catch {
      setLoginError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-6">
      <h2 className="section-title mb-5">Welcome back</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="label">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
        </div>
        {loginError && (
          <p className="text-red-400 text-sm">Invalid email or password.</p>
        )}
        <button
          type="submit"
          disabled={loading || !email || !password}
          className="btn-primary w-full mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
