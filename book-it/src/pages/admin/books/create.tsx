import { useRouter } from "next/router";

import AdminLayout from "@/components/admin/AdminLayout";
import BookForm from "@/components/admin/BookForm";

export default function CreateBook() {
  const router = useRouter();

  async function createBook(book: {
    title: string;
    author: string;
    description: string;
    genre: string;
    image: string;
  }) {
    const response = await fetch("/api/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    router.push("/admin/books");
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-[#6B1E2E]">
          Add New Book
        </h1>

        <BookForm
          buttonText="Add Book"
          onSubmit={createBook}
        />
      </div>
    </AdminLayout>
  );
}