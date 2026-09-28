import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  image: string;
  totalCopies: number;
  availableCopies: number;
}

export default function ManageBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/book");
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to load books.");
        return;
      }

      setBooks(data.books);
    } catch (error) {
      console.error(error);
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/book/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete book.");
        return;
      }

      setBooks((currentBooks) =>
        currentBooks.filter((book) => book._id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Something went wrong while deleting the book.");
    }
  }

  return (
    <AdminLayout>
      <div>
        {/* Page header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#6B1E2E]">
              Manage Books
            </h1>

            <p className="mt-2 text-gray-600">
              View, add, edit, and delete books from the BookIt
              library.
            </p>
          </div>

          <Link
            href="/admin/books/create"
            className="flex items-center gap-2 rounded-md bg-[#6B1E2E] px-5 py-3 font-medium text-white hover:bg-[#45121D]"
          >
            <Plus size={18} />
            Add New Book
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-md bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="rounded-lg bg-white p-8 text-center shadow">
            <p className="text-gray-600">Loading books...</p>
          </div>
        )}

        {/* No books */}
        {!loading && !error && books.length === 0 && (
          <div className="rounded-lg bg-white p-10 text-center shadow">
            <h2 className="text-xl font-semibold text-[#6B1E2E]">
              No books found
            </h2>

            <p className="mt-2 text-gray-600">
              Add your first book to the BookIt library.
            </p>

            <Link
              href="/admin/books/create"
              className="mt-5 inline-block rounded-md bg-[#6B1E2E] px-5 py-3 text-white hover:bg-[#45121D]"
            >
              Add Book
            </Link>
          </div>
        )}

        {/* Books table */}
        {!loading && books.length > 0 && (
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#6B1E2E] text-left text-white">
                  <tr>
                    <th className="px-5 py-4">Book</th>
                    <th className="px-5 py-4">Author</th>
                    <th className="px-5 py-4">Genre</th>
                    <th className="px-5 py-4">Availability</th>
                    <th className="px-5 py-4 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {books.map((book) => (
                    <tr
                      key={book._id}
                      className="border-b border-gray-200 last:border-0"
                    >
                      {/* Book */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={book.image}
                            alt={book.title}
                            className="h-16 w-12 rounded object-cover"
                          />

                          <div>
                            <p className="font-semibold text-gray-900">
                              {book.title}
                            </p>

                            <p className="mt-1 max-w-xs truncate text-sm text-gray-500">
                              {book.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Author */}
                      <td className="px-5 py-4 text-gray-700">
                        {book.author}
                      </td>

                      {/* Genre */}
                      <td className="px-5 py-4 text-gray-700">
                        {book.genre}
                      </td>

                      {/* Availability */}
                      <td className="px-5 py-4">
  {book.availableCopies > 0 ? (
    <div>
      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
        {book.availableCopies} available
      </span>

      <p className="mt-2 text-xs text-gray-500">
        {book.totalCopies} total copies
      </p>
    </div>
  ) : (
    <div>
      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
        No copies available
      </span>

      <p className="mt-2 text-xs text-gray-500">
        {book.totalCopies} total copies
      </p>
    </div>
  )}
</td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/books/edit/${book._id}`}
                            className="flex items-center gap-1 rounded-md border border-[#6B1E2E] px-3 py-2 text-sm text-[#6B1E2E] hover:bg-[#FAF7F5]"
                          >
                            <Pencil size={16} />
                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(book._id)
                            }
                            className="flex items-center gap-1 rounded-md border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

ManageBooks.displayName = "Manage Books";