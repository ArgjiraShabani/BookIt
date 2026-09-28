import { FormEvent, useState, useEffect } from "react";

import { useRouter } from "next/router";
import { getSession, signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();

useEffect(() => {
  if (status === "authenticated") {
    router.replace("/dashboard");
  }
}, [status, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setError("");
  setLoading(true);

  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  setLoading(false);

  if (result?.error) {
    setError("Invalid email or password.");
    return;
  }

  const session = await getSession();

  if (session?.user.role === "admin") {
    router.push("/admin");
  } else {
    router.push("/dashboard");
  }
}

  return (
    <>
    <div className="min-h-screen bg-[#FAF7F5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#6B1E2E]">
            Welcome Back
          </h1>

          <p className="text-gray-600 mt-2">
            Log in to your BookIt account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6B1E2E]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6B1E2E]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6B1E2E] text-white py-3 rounded-lg font-medium hover:bg-[#45121D] transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-[#6B1E2E] font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}

Login.displayName = "Login";