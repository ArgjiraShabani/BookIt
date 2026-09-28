import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import AdminLayout from "@/components/admin/AdminLayout";

import connectDB from "lib/mongodb";
import User from "models/User";

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface UsersPageProps {
  users: UserData[];
}

export default function UsersPage({
  users,
}: UsersPageProps) {
  return (
    <AdminLayout>
    <div className="min-h-screen bg-[#FAF7F5] px-6 py-12">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-bold text-[#6B1E2E]">
          Manage Users
        </h1>

        <p className="mt-2 text-gray-600">
          View registered BookIt users.
        </p>

        <div className="mt-8 overflow-hidden rounded-lg bg-white shadow">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-4 text-left">
                  Name
                </th>

                <th className="px-5 py-4 text-left">
                  Email
                </th>

                <th className="px-5 py-4 text-left">
                  Role
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t"
                >
                  <td className="px-5 py-4">
                    {user.name}
                  </td>

                  <td className="px-5 py-4">
                    {user.email}
                  </td>

                  <td className="px-5 py-4">
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
    </AdminLayout>
  );
}
export const getServerSideProps: GetServerSideProps =
  async (context) => {

    // 1. Get current session
    const session = await getSession(context);

    // 2. Must be logged in
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    // 3. Must be admin
    if (session.user.role !== "admin") {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    // 4. Connect to database
    await connectDB();

    // 5. Get users
    const usersFromDB = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    // 6. Make MongoDB documents serializable
    const users = JSON.parse(
      JSON.stringify(usersFromDB)
    );

    // 7. Send users to React component
    return {
      props: {
        users,
      },
    };
  };