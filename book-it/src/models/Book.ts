import mongoose, { Schema } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  description: string;
  genre: string;
  image: string;
  totalCopies: number;
  availableCopies: number;
}

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    genre: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    totalCopies: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    availableCopies: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Book =
  mongoose.models.Book ||
  mongoose.model<IBook>("Book", BookSchema);

export default Book;