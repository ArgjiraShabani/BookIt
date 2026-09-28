import Link from "next/link";
import { useRouter } from "next/router";
import {
  LayoutDashboard,
  BookOpen,
  Plus,
  Users,
  Library,
} from "lucide-react";

export default function AdminSidebar() {
  const router = useRouter();

  function linkClass(path: string) {
    const active = router.pathname === path;

    return `flex items-center gap-3 rounded-md px-4 py-3 transition ${
      active
        ? "bg-[#6B1E2E] text-white"
        : "text-gray-700 hover:bg-[#F3E8E8]"
    }`;
  }

  return (
    <aside className="w-64 border-r bg-white p-5">
      <h2 className="mb-6 text-xl font-bold text-[#6B1E2E]">
        Admin Panel
      </h2>

      <nav className="space-y-2">
        <Link
          href="/admin"
          className={linkClass("/admin")}
        >
          <LayoutDashboard size={19} />
          Dashboard
        </Link>

        <Link
          href="/admin/books"
          className={linkClass("/admin/books")}
        >
          <BookOpen size={19} />
          Manage Books
        </Link>

        <Link
          href="/admin/books/create"
          className={linkClass("/admin/books/create")}
        >
          <Plus size={19} />
          Add Book
        </Link>

        <Link
          href="/admin/rentals"
          className={linkClass("/admin/rentals")}
        >
          <Library size={19} />
          Rentals
        </Link>

        <Link
          href="/admin/users"
          className={linkClass("/admin/users")}
        >
          <Users size={19} />
          Users
        </Link>
      </nav>
    </aside>
  );
}