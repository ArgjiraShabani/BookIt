import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface Rental {
  _id: string;

  book: {
    _id: string;
    title: string;
    author: string;
    image: string;
    genre: string;
  };

  rentedAt: string;
  dueDate: string;
  returnedAt?: string;
  status: "active" | "returned";
}

export default function MyRentals() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchRentals();
    }
  }, [status]);

  async function fetchRentals() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/rentals/my"
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Failed to load rentals."
        );
        return;
      }

      setRentals(data.rentals);
    } catch (error) {
      console.error(error);
      setError("Failed to load rentals.");
    } finally {
      setLoading(false);
    }
  }

  async function handleReturn(
    rentalId: string
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to return this book?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/rentals/${rentalId}/returns`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message || "Failed to return book."
        );
        return;
      }

      // Reload rentals after returning
      await fetchRentals();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  if (
    status === "loading" ||
    loading
  ) {
    return (
      <div className="min-h-screen bg-[#FAF7F5] px-6 py-16">
        <p className="text-center">
          Loading rentals...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F5] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-[#6B1E2E]">
          My Rentals
        </h1>

        <p className="mt-2 text-gray-600">
          View and manage your rented books.
        </p>

        {error && (
          <p className="mt-6 text-red-600">
            {error}
          </p>
        )}

        {rentals.length === 0 && !error ? (
          <div className="mt-10 rounded-lg bg-white p-10 text-center shadow-sm">
            <p className="text-gray-600">
              You haven't rented any books yet.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-5">
            {rentals.map((rental) => {
              const overdue =
                rental.status === "active" &&
                new Date() >
                  new Date(rental.dueDate);

              return (
                <div
                  key={rental._id}
                  className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-sm sm:flex-row"
                >
                  <img
                    src={rental.book.image}
                    alt={rental.book.title}
                    className="h-48 w-32 rounded-md object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#9B3A4A]">
                      {rental.book.genre}
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      {rental.book.title}
                    </h2>

                    <p className="text-gray-500">
                      by {rental.book.author}
                    </p>

                    <div className="mt-5 space-y-1 text-sm text-gray-600">
                      <p>
                        Rented:{" "}
                        {new Date(
                          rental.rentedAt
                        ).toLocaleDateString()}
                      </p>

                      <p>
                        Due:{" "}
                        {new Date(
                          rental.dueDate
                        ).toLocaleDateString()}
                      </p>

                      {rental.returnedAt && (
                        <p>
                          Returned:{" "}
                          {new Date(
                            rental.returnedAt
                          ).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    <div className="mt-5">
                      {rental.status ===
                      "returned" ? (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                          Returned
                        </span>
                      ) : overdue ? (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                          Overdue
                        </span>
                      ) : (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                          Active
                        </span>
                      )}
                    </div>
                  </div>

                  {rental.status === "active" && (
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          handleReturn(rental._id)
                        }
                        className="rounded-md bg-[#6B1E2E] px-5 py-3 font-medium text-white hover:bg-[#45121D]"
                      >
                        Return Book
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

MyRentals.displayName = "My Rentals";