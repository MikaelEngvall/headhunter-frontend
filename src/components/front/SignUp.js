import { useEffect, useState } from "react";
import axios from "axios";
import { findUserByEmail } from "./functions/findUserByEmail";
import CheckSvg from "../utils/icons/check.svg?react";

function FieldRow({ label, type, placeholder, value, onChange, status }) {
  return (
    <div>
      <label className="label">{label}</label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="input-field pr-10"
          required
        />
        {status === "ok" && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500">
            <CheckSvg className="w-4 h-4 fill-emerald-500" />
          </span>
        )}
        {status === "error" && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 text-xs font-medium">✕</span>
        )}
      </div>
    </div>
  );
}

export default function SignUp({ setLoginVisible, setSignUpVisible }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailOk, setIsEmailOk] = useState(false);
  const [emailStatus, setEmailStatus] = useState(0); // 1=ok, 0=empty, -1=taken
  const [isPasswordOk, setIsPasswordOk] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleEmailChange(val) {
    setEmail(val);
    setIsEmailOk(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(val));
  }

  useEffect(() => {
    if (isEmailOk) findUserByEmail(email, setEmailStatus);
    else setEmailStatus(0);
  }, [email, isEmailOk]);

  function handlePasswordChange(val) {
    setPassword(val);
    setIsPasswordOk(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(val));
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8080/api/v1/users/register",
        { email, username, password, roles: "user" },
        { headers: { "Content-Type": "application/json" } }
      );
      setLoginVisible(true);
      setSignUpVisible(false);
    } catch (err) {
      console.error("Sign up error", err);
    } finally {
      setLoading(false);
    }
  }

  const canSubmit = emailStatus === 1 && username !== "" && isPasswordOk;

  return (
    <div className="card p-6">
      <h2 className="section-title mb-5">Create account</h2>
      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        <div>
          <label className="label">Email</label>
          <div className="relative">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className="input-field pr-10"
              required
            />
            {emailStatus === 1 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                <CheckSvg className="w-4 h-4 fill-emerald-500" />
              </span>
            )}
            {emailStatus === -1 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 text-xs">taken</span>
            )}
          </div>
        </div>
        <div>
          <label className="label">Username</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field pr-10"
              required
            />
            {username && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                <CheckSvg className="w-4 h-4 fill-emerald-500" />
              </span>
            )}
          </div>
        </div>
        <div>
          <label className="label">Password</label>
          <div className="relative">
            <input
              type="password"
              placeholder="Min 8 chars, 1 upper, 1 number, 1 symbol"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="input-field pr-10"
              required
            />
            {isPasswordOk && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                <CheckSvg className="w-4 h-4 fill-emerald-500" />
              </span>
            )}
          </div>
          {password && !isPasswordOk && (
            <p className="text-slate-500 text-xs mt-1">
              Must be 8+ chars with uppercase, number and symbol.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!canSubmit || loading}
          className="btn-primary w-full mt-1 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account…" : "Create Account"}
        </button>
      </form>
    </div>
  );
}
