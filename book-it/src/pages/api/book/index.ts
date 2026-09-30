import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { authOptions } from "../auth/[...nextauth]";
import {
  getBooks,
  createBook,
} from "controllers/bookController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  if (req.method === "GET") {
    return getBooks(req, res);
  }

  if (req.method === "POST") {
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

    return createBook(req, res);
  }

  return res.status(405).json({
    message: "Method not allowed.",
  });
}