import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";

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

export default function BookDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

const [renting, setRenting] = useState(false);
const [rentError, setRentError] = useState("");

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!router.isReady || typeof id !== "string") {
      return;
    }

    async function fetchBook() {
      try {
        const response = await fetch(`/api/book/${id}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to load book.");
          return;
        }

        setBook(data.book);
      } catch (error) {
        console.error(error);
        setError("Failed to load book.");
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [router.isReady, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F5] px-6 py-16">
        <p className="text-center text-gray-600">
          Loading book...
        </p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-[#FAF7F5] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-red-600">
            {error || "Book not found."}
          </p>
        </div>
      </div>
    );
  }
  async function handleRent() {
  if (!session) {
    router.push("/login");
    return;
  }

  if (!book) return;

  try {
    setRenting(true);
    setRentError("");

    const response = await fetch("/api/rentals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId: book._id,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setRentError(
        data.message || "Failed to rent book."
      );
      return;
    }

    router.push("/rentals");
  } catch (error) {
    console.error(error);
    setRentError("Something went wrong.");
  } finally {
    setRenting(false);
  }
}

  return (
    <div className="min-h-screen bg-[#FAF7F5] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Back button */}
        <Link
          href="/browseBooks"
          className="mb-8 inline-flex items-center gap-2 text-[#6B1E2E] hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Books
        </Link>

        {/* Book details */}
        <div className="grid gap-10 rounded-xl bg-white p-8 shadow-sm md:grid-cols-2">
          {/* Book cover */}
          <div className="flex justify-center">
            <img
              src={book.image}
              alt={book.title}
              className="max-h-[550px] w-full max-w-sm rounded-lg object-cover shadow"
            />
          </div>

          {/* Information */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-[#9B3A4A]">
              {book.genre}
            </span>

            <h1 className="mt-3 text-4xl font-bold text-[#1F1F1F]">
              {book.title}
            </h1>

            <p className="mt-2 text-lg text-gray-500">
              by {book.author}
            </p>

            {/* Availability */}
            <div className="mt-6">
              {book.availableCopies > 0 ? (
                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                  {book.availableCopies} of {book.totalCopies} copies available
                </span>
              ) : (
                <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
                  Currently unavailable
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-[#1F1F1F]">
                Description
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                {book.description}
              </p>
            </div>

            {/* Rent */}
            <div className="mt-10">
              <button
  onClick={handleRent}
  disabled={
    book.availableCopies === 0 || renting
  }
  className="rounded-md bg-[#6B1E2E] px-8 py-3 font-medium text-white transition hover:bg-[#45121D] disabled:cursor-not-allowed disabled:bg-gray-400"
>
  {renting
    ? "Renting..."
    : book.availableCopies > 0
    ? "Rent Book"
    : "Unavailable"}
</button>
{rentError && (
  <p className="mt-3 text-sm text-red-600">
    {rentError}
  </p>
)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

BookDetails.displayName = "Book Details";