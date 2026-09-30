import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

import connectDB from "lib/mongodb";
import Book from "models/Book";

// GET ALL BOOKS

export async function getBooks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const books = await Book.find().sort({ createdAt: -1 });

    return res.status(200).json({
      books,
    });
  } catch (error) {
    console.error("Get books error:", error);

    return res.status(500).json({
      message: "Failed to get books.",
    });
  }
}

// GET ONE BOOK

export async function getBookById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const { id } = req.query;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid book ID.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid book ID.",
      });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found.",
      });
    }

    return res.status(200).json({
      book,
    });
  } catch (error) {
    console.error("Get book error:", error);

    return res.status(500).json({
      message: "Failed to get book.",
    });
  }
}

// CREATE BOOK

export async function createBook(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const {
      title,
      author,
      description,
      genre,
      image,
      totalCopies,
      

    } = req.body;

    if (
      !title ||
      !author ||
      !description ||
      !genre ||
      !image ||
      !totalCopies 
    ) {
      return res.status(400).json({
        message: "Please provide all book fields.",
      });
    }

    const book = await Book.create({
      title,
      author,
      description,
      genre,
      image,
      totalCopies,
      availableCopies: totalCopies,
    });

    return res.status(201).json({
      message: "Book created successfully.",
      book,
    });
  } catch (error) {
    console.error("Create book error:", error);

    return res.status(500).json({
      message: "Failed to create book.",
    });
  }
}

// UPDATE BOOK
// PUT /api/book/:id
export async function updateBook(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const { id } = req.query;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid book ID.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid book ID.",
      });
    }

    const {
  title,
  author,
  description,
  genre,
  image,
  totalCopies,
} = req.body;

const existingBook = await Book.findById(id);

if (!existingBook) {
  return res.status(404).json({
    message: "Book not found.",
  });
}

if (totalCopies < 1) {
  return res.status(400).json({
    message: "Total copies must be at least 1.",
  });
}


const rentedCopies =
  existingBook.totalCopies - existingBook.availableCopies;


if (totalCopies < rentedCopies) {
  return res.status(400).json({
    message: `You cannot reduce total copies below ${rentedCopies} because ${rentedCopies} copies are currently rented.`,
  });
}


const newAvailableCopies =
  totalCopies - rentedCopies;

const book = await Book.findByIdAndUpdate(
  id,
  {
    title,
    author,
    description,
    genre,
    image,
    totalCopies,
    availableCopies: newAvailableCopies,
  },
  {
    new: true,
    runValidators: true,
  }
);

    if (!book) {
      return res.status(404).json({
        message: "Book not found.",
      });
    }

    return res.status(200).json({
      message: "Book updated successfully.",
      book,
    });
  } catch (error) {
    console.error("Update book error:", error);

    return res.status(500).json({
      message: "Failed to update book.",
    });
  }
}

// DELETE BOOK

export async function deleteBook(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const { id } = req.query;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid book ID.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid book ID.",
      });
    }

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found.",
      });
    }

    return res.status(200).json({
      message: "Book deleted successfully.",
    });
  } catch (error) {
    console.error("Delete book error:", error);

    return res.status(500).json({
      message: "Failed to delete book.",
    });
  }
}