
import { motion } from "framer-motion";
import Image from "next/image";

import CustomImage from "@/assets/images/image.jpg";

export default function About() {
  return (
    <div className="pt-14">
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF7F5]">

        {/* Introduction */}
        <motion.section
          className="w-full py-24 px-6 bg-[#6B1E2E] text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold mb-6">
            About BookIt
          </h1>

          <p className="text-xl max-w-2xl mx-auto">
            BookIt is a platform designed to make discovering and renting
            books simple, convenient, and enjoyable.
          </p>
        </motion.section>

        {/* Our Story */}
        <motion.section
          className="w-full py-20 px-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold mb-10 text-center text-[#6B1E2E]">
              Our Story
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

              <div className="p-8 bg-white rounded-xl shadow-md">
                <p className="text-gray-700 leading-relaxed">
                  BookIt was created with a simple idea: make books easier
                  to discover and rent. Instead of searching through
                  different places, users can browse a collection of books,
                  view their details, and manage their rentals in one place.
                </p>

                <p className="text-gray-700 leading-relaxed mt-5">
                  Whether you're looking for a novel, an academic book, or
                  something new to read, BookIt helps you find your next
                  book quickly and easily.
                </p>
              </div>

              <div className="flex justify-center">
                <Image
                  src={CustomImage}
                  alt="Books"
                  width={500}
                  height={300}
                  className="rounded-xl shadow-md"
                />
              </div>

            </div>
          </div>
        </motion.section>

        {/* Our Vision */}
        <motion.section
          className="w-full py-20 px-6 bg-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto max-w-5xl">

            <h2 className="text-4xl font-bold mb-10 text-[#6B1E2E]">
              Our Vision
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              <div className="p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-[#6B1E2E]">
                  Discover
                </h3>
                <p className="text-gray-600">
                  Explore a variety of books and discover something new
                  to read.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-[#6B1E2E]">
                  Rent
                </h3>
                <p className="text-gray-600">
                  Rent available books through a simple and convenient
                  process.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-[#6B1E2E]">
                  Read
                </h3>
                <p className="text-gray-600">
                  Enjoy your books and keep track of your current and
                  previous rentals.
                </p>
              </div>

            </div>
          </div>
        </motion.section>

        {/* Final section */}
        <motion.section
          className="w-full py-20 px-6 bg-[#45121D] text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-5">
            Your next book is waiting.
          </h2>

          <p className="text-lg">
            Browse our collection and find your next favorite read.
          </p>
        </motion.section>

      </div>
    </div>
  );
}

About.displayName = "About";

