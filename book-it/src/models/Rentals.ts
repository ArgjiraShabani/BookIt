import mongoose, { Schema } from "mongoose";

export interface IRental {
  user: mongoose.Types.ObjectId;
  book: mongoose.Types.ObjectId;
  rentedAt: Date;
  dueDate: Date;
  returnedAt?: Date;
  status: "active" | "returned" | "overdue";
}

const RentalSchema = new Schema<IRental>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    rentedAt: {
      type: Date,
      default: Date.now,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    returnedAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "returned", "overdue"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Rental =
  mongoose.models.Rental ||
  mongoose.model<IRental>("Rental", RentalSchema);

export default Rental;