import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { authOptions } from "../auth/[...nextauth]";
import {
  createRental,
  getAllRentals,
} from "controllers/rentalController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(
    req,
    res,
    authOptions
  );

  if (!session || !session.user?.email) {
    return res.status(401).json({
      message: "You must be logged in.",
    });
  }

 if (req.method === "POST") {
  if (session.user.role !== "user") {
    return res.status(403).json({
      message: "Only users can rent books.",
    });
  }

  return createRental(
    req,
    res,
    session.user.email
  );
}

  if (req.method === "GET") {
    if (session.user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required.",
      });
    }

    return getAllRentals(req, res);
  }

  return res.status(405).json({
    message: "Method not allowed.",
  });
}