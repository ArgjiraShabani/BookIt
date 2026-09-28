import { FormEvent, useState } from "react";

interface BookData {
  title: string;
  author: string;
  description: string;
  genre: string;
  image: string;
  totalCopies: number;
}

interface BookFormProps {
  initialData?: BookData;
  buttonText: string;
  onSubmit: (book: BookData) => Promise<void>;
}

export default function BookForm({
  initialData,
  buttonText,
  onSubmit,
}: BookFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [genre, setGenre] = useState(initialData?.genre || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [totalCopies, setTotalCopies] =useState(initialData?.totalCopies || 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      await onSubmit({
        title,
        author,
        description,
        genre,
        image,
        totalCopies,
      });
    } catch (error) {
      console.error(error);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg bg-white p-8 shadow"
    >
      <div>
        <label className="mb-2 block font-medium">
          Title
        </label>

        <input
          required
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Author
        </label>

        <input
          required
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Genre
        </label>

        <input
          required
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          required
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Image URL
        </label>

        <input
          required
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-3"
        />
      </div>
<div>
        <label className="mb-2 block font-medium">
          Total Copies
        </label>

        <input
          required
          type="number"
          min="1"
          value={totalCopies}
          onChange={(e) =>
            setTotalCopies(Number(e.target.value))
          }
          className="w-full rounded-md border border-gray-300 px-4 py-3"
        />

        <p className="mt-1 text-sm text-gray-500">
          Total number of physical copies owned by the library.
        </p>
      </div>

      {error && (
        <p className="rounded-md bg-red-100 p-3 text-red-700">
          {error}
        </p>
      )}


      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-[#6B1E2E] px-5 py-3 font-medium text-white hover:bg-[#45121D] disabled:opacity-50"
      >
        {loading ? "Saving..." : buttonText}
      </button>
    </form>
  );
}