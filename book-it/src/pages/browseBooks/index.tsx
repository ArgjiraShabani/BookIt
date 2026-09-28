import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";

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

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
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

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F5] px-6 py-16">
        <p className="text-center text-gray-600">
          Loading books...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF7F5] px-6 py-16">
        <p className="text-center text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F5]">
      {/* Page heading */}
      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <BookOpen
            className="mx-auto mb-4 text-[#6B1E2E]"
            size={40}
          />

          <h1 className="text-4xl font-bold text-[#6B1E2E]">
            Browse Books
          </h1>

          <p className="mt-4 text-gray-600">
            Explore our collection and find your next book to
            read.
          </p>
        </div>
      </section>

      {/* Books */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          {books.length === 0 ? (
            <div className="rounded-lg bg-white p-10 text-center shadow-sm">
              <p className="text-gray-600">
                There are currently no books in the catalog.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Book cover */}
                  <div className="h-80 bg-gray-100">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Book information */}
                  <div className="p-5">
                    <span className="text-sm font-medium text-[#9B3A4A]">
                      {book.genre}
                    </span>

                    <h2 className="mt-2 text-xl font-bold text-[#1F1F1F]">
                      {book.title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      by {book.author}
                    </p>

                    {/* Availability */}
                    <div className="mt-4">
                      {book.availableCopies > 0 ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          {book.availableCopies}{" "}
                          {book.availableCopies === 1
                            ? "copy"
                            : "copies"}{" "}
                          available
                        </span>
                      ) : (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                          Currently unavailable
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <Link
                      href={`/browseBooks/${book._id}`}
                      className="mt-6 block rounded-md bg-[#6B1E2E] px-4 py-3 text-center font-medium text-white transition hover:bg-[#45121D]"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

Books.displayName = "Browse Books";