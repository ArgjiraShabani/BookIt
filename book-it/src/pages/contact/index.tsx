import { useState } from "react";
import { useForm } from "react-hook-form";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ContactFormData>();

  async function onSubmit(data: ContactFormData) {
    setSuccess("");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(
          result.message || "Failed to send message."
        );
        return;
      }

      setSuccess("Your message has been sent successfully!");

      reset();
    } catch (error) {
      console.error(error);

      setServerError(
        "Something went wrong. Please try again."
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F5] px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#6B1E2E]">
            Contact Us
          </h1>

          <p className="mt-2 text-gray-600">
            Have a question? Send us a message and
            we'll get back to you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 rounded-xl bg-white p-8 shadow"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block font-medium">
              Name
            </label>

            <input
              type="text"
              {...register("name", {
                required: "Name is required.",
                minLength: {
                  value: 2,
                  message:
                    "Name must contain at least 2 characters.",
                },
              })}
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-[#6B1E2E]"
              placeholder="Your name"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              {...register("email", {
                required: "Email is required.",

                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:
                    "Please enter a valid email address.",
                },
              })}
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-[#6B1E2E]"
              placeholder="you@example.com"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="mb-2 block font-medium">
              Subject
            </label>

            <input
              type="text"
              {...register("subject", {
                required: "Subject is required.",
                minLength: {
                  value: 3,
                  message:
                    "Subject must contain at least 3 characters.",
                },
              })}
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-[#6B1E2E]"
              placeholder="How can we help?"
            />

            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="mb-2 block font-medium">
              Message
            </label>

            <textarea
              rows={6}
              {...register("message", {
                required: "Message is required.",

                minLength: {
                  value: 10,
                  message:
                    "Message must contain at least 10 characters.",
                },
              })}
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-[#6B1E2E]"
              placeholder="Write your message..."
            />

            {errors.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Server error */}
          {serverError && (
            <div className="rounded-md bg-red-100 p-3 text-red-700">
              {serverError}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="rounded-md bg-green-100 p-3 text-green-700">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-[#6B1E2E] px-5 py-3 font-medium text-white transition hover:bg-[#45121D] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? "Sending..."
              : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}