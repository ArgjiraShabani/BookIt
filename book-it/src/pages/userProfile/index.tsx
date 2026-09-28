import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { User } from "lucide-react";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export default function Profile() {
  const { status } = useSession();
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Get profile from database
  useEffect(() => {
    if (status !== "authenticated") return;

    async function fetchProfile() {
      try {
        setLoading(true);

        const response = await fetch("/api/profile");
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to load profile.");
          return;
        }

        setProfile(data.user);

        // Fill the form
        setName(data.user.name);
        setEmail(data.user.email);
      } catch (error) {
        console.error(error);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [status]);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch("/api/profile", {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Failed to update profile."
        );
        return;
      }

      setProfile(data.user);

      setSuccess("Profile updated successfully.");
    } catch (error) {
      console.error(error);
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F5] px-6 py-16">
        <p className="text-center text-gray-600">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F5] px-6 py-16">
      <div className="mx-auto max-w-2xl">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#6B1E2E]">
            My Profile
          </h1>

          <p className="mt-2 text-gray-600">
            View and update your account information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-xl bg-white p-8 shadow-sm">
          {/* User icon */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#6B1E2E] text-white">
              <User size={28} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                {profile?.name}
              </h2>

              <p className="text-sm text-gray-500">
                {profile?.email}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="mb-2 block font-medium">
                Name
              </label>

              <input
                type="text"
                required
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-[#6B1E2E]"
              />
            </div>

            {/* Email */}
            <div className="mt-6">
              <label className="mb-2 block font-medium">
                Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-[#6B1E2E]"
              />
            </div>

            {/* Role - display only */}
            <div className="mt-6">
              <label className="mb-2 block font-medium">
                Account Type
              </label>

              <input
                type="text"
                value={profile?.role || ""}
                disabled
                className="w-full rounded-md border border-gray-200 bg-gray-100 px-4 py-3 capitalize text-gray-500"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="mt-5 text-sm text-red-600">
                {error}
              </p>
            )}

            {/* Success */}
            {success && (
              <p className="mt-5 text-sm text-green-700">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="mt-8 rounded-md bg-[#6B1E2E] px-6 py-3 font-medium text-white transition hover:bg-[#45121D] disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

Profile.displayName = "Profile";