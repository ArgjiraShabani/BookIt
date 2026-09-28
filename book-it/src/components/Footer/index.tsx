import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t mt-10 bg-[#45121D] text-white">
      <div className="container mx-auto px-4 py-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <BookOpen size={24} />
            <span className="text-xl font-bold">BookIt</span>
          </Link>

          {/* Links */}
          <div className="flex gap-6">
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/books">Browse Books</Link>
          </div>

        </div>

        <div className="border-t mt-6 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 BookIt. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;