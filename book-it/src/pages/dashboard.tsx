import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
  if (status === "unauthenticated") {
    router.push("/login");
  }

  if (status === "authenticated" && session?.user.role === "admin") {
    router.push("/admin");
  }
}, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FAF7F5] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-[#6B1E2E]">
          Welcome, {session.user?.name}!
        </h1>

        <p className="mt-2 text-gray-600">
          Welcome to your BookIt dashboard.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <Link
            href={"/rentals"}>
            <h2 className="text-xl font-semibold text-[#6B1E2E]">
              My Rentals   
            </h2>
            </Link>

            <p className="mt-2 text-gray-600">
              View the books you currently have rented.
            </p>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow">
            <Link
          href={"/userProfile"}>
            <h2 className="text-xl font-semibold text-[#6B1E2E]">
              My Profile
            </h2>
            </Link>
            <p className="mt-2 text-gray-600">
              View and update your BookIt profile.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-xl font-semibold text-[#6B1E2E]">
              Browse Books
            </h2>

            <p className="mt-2 text-gray-600">
              Find a book you would like to rent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}