import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { authOptions } from "../auth/[...nextauth]";
import {
  getBookById,
  updateBook,
  deleteBook,
} from "controllers/bookController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // PUBLIC
  // Anyone can view a book
  if (req.method === "GET") {
    return getBookById(req, res);
  }

  // PUT and DELETE are ADMIN ONLY
  if (
    req.method === "PUT" ||
    req.method === "DELETE"
  ) {
    const session = await getServerSession(
      req,
      res,
      authOptions
    );

    if (!session) {
      return res.status(401).json({
        message: "You must be logged in.",
      });
    }

    if (session.user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required.",
      });
    }

    if (req.method === "PUT") {
      return updateBook(req, res);
    }

    return deleteBook(req, res);
  }

  return res.status(405).json({
    message: "Method not allowed.",
  });
}