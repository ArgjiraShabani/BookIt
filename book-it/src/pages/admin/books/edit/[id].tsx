import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import AdminLayout from "@/components/admin/AdminLayout";
import BookForm from "@/components/admin/BookForm";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  image: string;
  totalCopies: number;
}

interface BookFormData {
  title: string;
  author: string;
  description: string;
  genre: string;
  image: string;
  totalCopies: number;
}

export default function EditBook() {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get the existing book
  useEffect(() => {
    if (!router.isReady || typeof id !== "string") {
      return;
    }

    async function fetchBook() {
      try {
        setLoading(true);
        setError("");

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

  // Update the book
  async function updateBook(bookData: BookFormData) {
    if (typeof id !== "string") {
      return;
    }

    const response = await fetch(`/api/book/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...bookData,
        
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update book.");
    }

    router.push("/admin/books");
  }

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-gray-600">Loading book...</p>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="rounded-md bg-red-100 p-4 text-red-700">
          {error}
        </div>
      </AdminLayout>
    );
  }

  if (!book) {
    return (
      <AdminLayout>
        <p>Book not found.</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#6B1E2E]">
            Edit Book
          </h1>

          <p className="mt-2 text-gray-600">
            Update the information for {book.title}.
          </p>
        </div>

        <BookForm
          initialData={{
            title: book.title,
            author: book.author,
            description: book.description,
            genre: book.genre,
            image: book.image,
            totalCopies: book.totalCopies,
          }}
          buttonText="Save Changes"
          onSubmit={updateBook}
        />
      </div>
    </AdminLayout>
  );
}

EditBook.displayName = "Edit Book";