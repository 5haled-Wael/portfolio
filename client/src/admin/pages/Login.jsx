import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { LoaderCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: loginUser, isPending, error } = useLogin();

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
          <p role="alert" className="text-center text-sm text-red-500">
            {error.message}
          </p>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-secondary text-sm">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
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
            name="password"
            autoComplete="current-password"
            required
            className="bg-background border-border text-primary focus:border-accent rounded-lg border p-3 transition-colors outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-accent text-primary flex cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-center text-lg font-semibold"
          disabled={isPending}
        >
          {isPending ? (
            <LoaderCircle className="animate-spin" size={18} />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
