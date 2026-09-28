
import Image from "next/image";
import { motion } from "framer-motion";

import CustomImage from "@/assets/images/image.jpg";

export default function Home() {
  return (
    <div className="pt-14">
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF7F5]">

        {/* Hero section */}
        <motion.section
          className="w-full py-24 px-6 bg-[#6B1E2E] text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to BookIt
          </h1>

          <p className="text-xl md:text-2xl mb-8">
            Discover, rent, and enjoy your next favorite book.
          </p>

          <button className="bg-white text-[#6B1E2E] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Browse Books
          </button>
        </motion.section>

        {/* About section */}
        <motion.section
          className="max-w-6xl py-20 px-6 text-center"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-[#6B1E2E]">
            About BookIt
          </h2>

          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            BookIt is a simple and convenient platform where you can
            discover books and rent them whenever you want. Browse our
            collection, find your favorite book, and keep track of your
            rentals in one place.
          </p>

          <Image
            src={CustomImage}
            alt="Books"
            width={500}
            height={300}
            className="rounded-xl mx-auto"
          />
        </motion.section>

        {/* Services section */}
        <motion.section
          className="w-full py-20 px-6 bg-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-10 text-[#6B1E2E]">
            What You Can Do
          </h2>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-[#6B1E2E]">
                Browse Books
              </h3>
              <p className="text-gray-600">
                Explore our collection and find books that interest you.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-[#6B1E2E]">
                Rent Books
              </h3>
              <p className="text-gray-600">
                Rent available books and enjoy them at your own pace.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-[#6B1E2E]">
                Manage Rentals
              </h3>
              <p className="text-gray-600">
                Keep track of your current and previous book rentals.
              </p>
            </div>

          </div>
        </motion.section>

        {/* Contact section */}
        <motion.section
          className="w-full py-20 bg-[#45121D] text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6">
            Have Questions?
          </h2>

          <p className="mb-2">
            Email: contact@bookit.com
          </p>

          <p className="mb-2">
            Phone: +383 44 123 456
          </p>

          <p>
            Prishtina, Kosovo
          </p>
        </motion.section>

      </div>
    </div>
  );
}

Home.displayName = "Home";
