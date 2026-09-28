import Link from "next/link";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import AdminLayout from "@/components/admin/AdminLayout";
interface AdminProps {
  user: {
    name?: string | null;
    email?: string | null;
    role: "user" | "admin";
  };
}

export default function Admin({ user }: AdminProps) {
 return (
  <AdminLayout>
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#6B1E2E]">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Welcome, {user.name}. Manage BookIt from here.
        </p>
      </div>

      {/* your dashboard content */}
    </div>
  </AdminLayout>
);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
      },
    },
  };
};