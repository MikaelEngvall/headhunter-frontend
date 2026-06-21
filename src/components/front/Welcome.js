import { useState } from "react";
import SignUp from "./SignUp.js";
import Login from "./Login.js";

export default function Welcome({ setIsAuthorized }) {
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  function handleSignUp() {
    setSignUpVisible((v) => !v);
    setLoginVisible(false);
  }

  function handleLogin() {
    setLoginVisible((v) => !v);
    setSignUpVisible(false);
  }

  return (
    <div className="hero-bg min-h-screen flex flex-col items-center justify-center px-4">
      {/* Decorative glow blob */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600 opacity-[0.06] blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          AI-Powered Recruiting Platform
        </div>

        {/* Title */}
        <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-white mb-4 leading-none">
          Head<span className="text-indigo-400">hunter</span>
        </h1>
        <p className="text-xl text-slate-400 mb-3 font-light tracking-wide">
          Intelligent Recruiting
        </p>

        {/* OpenAI badge */}
        <img
          src="../static/powered-by-openai-badge-outlined-on-dark.svg"
          alt="Powered by OpenAI"
          className="h-7 mb-10 opacity-60"
        />

        {/* CTA buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSignUp}
            className={signUpVisible ? "btn-primary glow-indigo" : "btn-primary"}
          >
            Get Started
          </button>
          <button
            onClick={handleLogin}
            className="btn-secondary"
          >
            Log In
          </button>
        </div>

        {/* Forms */}
        {signUpVisible && (
          <div className="mt-8 w-full max-w-sm">
            <SignUp
              setLoginVisible={setLoginVisible}
              setSignUpVisible={setSignUpVisible}
            />
          </div>
        )}
        {loginVisible && (
          <div className="mt-8 w-full max-w-sm">
            <Login setIsAuthorized={setIsAuthorized} />
          </div>
        )}
      </div>
    </div>
  );
}
