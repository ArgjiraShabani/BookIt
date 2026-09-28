import Link from "next/link";
import { BookOpen, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-[#6B1E2E]"
        >
          <BookOpen size={25} />
          BookIt
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">

          <Link href="/" className="text-gray-700 hover:text-[#6B1E2E]">
            Home
          </Link>

          <Link
            href="/browseBooks"
            className="text-gray-700 hover:text-[#6B1E2E]"
          >
            Browse Books
          </Link>

          <Link
            href="/about"
            className="text-gray-700 hover:text-[#6B1E2E]"
          >
            About Us
          </Link>

          <Link
            href="/contact"
            className="text-gray-700 hover:text-[#6B1E2E]"
          >
            Contact
          </Link>

          {/* Authentication buttons */}
          {status === "loading" ? (
            <span className="text-gray-500">Loading...</span>
          ) : session ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-1 text-[#6B1E2E] font-medium"
              >
                <User size={18} />
                Dashboard
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="rounded-md bg-[#6B1E2E] px-4 py-2 text-white hover:bg-[#45121D]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-700 hover:text-[#6B1E2E]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-md bg-[#6B1E2E] px-4 py-2 text-white hover:bg-[#45121D]"
              >
                Register
              </Link>
            </>
          )}

        </nav>
      </div>
    </header>
  );
}