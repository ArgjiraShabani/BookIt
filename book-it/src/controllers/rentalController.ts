import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "lib/mongodb";
import Rental from "models/Rentals";
import Book from "models/Book";
import User from "models/User";

// CREATE RENTAL
// POST /api/rentals
export async function createRental(
  req: NextApiRequest,
  res: NextApiResponse,
  userEmail: string,
) {
  try {
    await connectDB();

    const { bookId } = req.body;

    if (!bookId ) {
      return res.status(400).json({
        message: "Book and user are required.",
      });
    }

    // Find the logged-in user
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Find the book
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found.",
      });
    }

    // Check availability
    if (book.availableCopies <= 0) {
      return res.status(400).json({
        message: "This book is currently unavailable.",
      });
    }

    // Prevent the same user from renting the same book twice
    const existingRental = await Rental.findOne({
      user: user._id,
      book: book._id,
      status: "active",
    });

    if (existingRental) {
      return res.status(400).json({
        message: "You already have an active rental for this book.",
      });
    }

    const rentedAt = new Date();

    // Rental lasts 14 days
    const dueDate = new Date(rentedAt);
    dueDate.setDate(dueDate.getDate() + 14);

    // Create rental
    const rental = await Rental.create({
      user: user._id,
      book: book._id,
      rentedAt,
      dueDate,
      status: "active",
    });

    // One less available copy
    book.availableCopies -= 1;
    await book.save();

    return res.status(201).json({
      message: "Book rented successfully.",
      rental,
    });
  } catch (error) {
    console.error("Create rental error:", error);

    return res.status(500).json({
      message: "Failed to rent book.",
    });
  }
}

// GET CURRENT USER'S RENTALS
// GET /api/rentals/my
export async function getMyRentals(
  req: NextApiRequest,
  res: NextApiResponse,
  userEmail: string
) {
  try {
    await connectDB();

    const user = await User.findOne({
      email: userEmail,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const rentals = await Rental.find({
      user: user._id,
    })
      .populate("book", "title author image genre")
      .sort({ rentedAt: -1 });

    return res.status(200).json({
      rentals,
    });
  } catch (error) {
    console.error("Get my rentals error:", error);

    return res.status(500).json({
      message: "Failed to get rentals.",
    });
  }
}

// GET ALL RENTALS
// GET /api/rentals
// Admin only
export async function getAllRentals(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const rentals = await Rental.find()
      .populate("user", "name email")
      .populate("book", "title author image")
      .sort({ rentedAt: -1 });

    return res.status(200).json({
      rentals,
    });
  } catch (error) {
    console.error("Get all rentals error:", error);

    return res.status(500).json({
      message: "Failed to get rentals.",
    });
  }
}

// RETURN BOOK
// PUT /api/rentals/:id/return
export async function returnRental(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const { id } = req.query;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid rental ID.",
      });
    }

    const rental = await Rental.findById(id);

    if (!rental) {
      return res.status(404).json({
        message: "Rental not found.",
      });
    }

    // Don't return it twice
    if (rental.status === "returned") {
      return res.status(400).json({
        message: "This book has already been returned.",
      });
    }

    const book = await Book.findById(rental.book);

    if (!book) {
      return res.status(404).json({
        message: "Book not found.",
      });
    }

    // Update rental
    rental.status = "returned";
    rental.returnedAt = new Date();

    await rental.save();

    // Put copy back into inventory
    book.availableCopies += 1;

    await book.save();

    return res.status(200).json({
      message: "Book returned successfully.",
      rental,
    });
  } catch (error) {
    console.error("Return rental error:", error);

    return res.status(500).json({
      message: "Failed to return book.",
    });
  }
}