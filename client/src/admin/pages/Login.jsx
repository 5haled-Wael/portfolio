import { useState } from "react";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: loginUser, isPending: loading, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        className="bg-surface border-border shadow-accent-glow flex flex-col gap-4 rounded-2xl border p-8 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-accent mb-4 text-center text-2xl">Admin Panel</h2>

        {/* Error Message */}
        {error && (
          <p className="text-center text-sm text-red-500">{error.message}</p>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-secondary text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="bg-background border-border text-primary focus:border-accent rounded-lg border p-3 transition-colors outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-secondary text-sm">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="bg-background border-border text-primary focus:border-accent rounded-lg border p-3 transition-colors outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-accent text-primary cursor-pointer rounded-lg px-4 py-2 text-center text-lg font-semibold"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
