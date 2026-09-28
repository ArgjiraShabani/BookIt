import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

import {
  getProfile,
  updateProfile,
} from "controllers/userController";

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

  if (req.method === "GET") {
    return getProfile(
      req,
      res,
      session.user.email
    );
  }

  if (req.method === "PUT") {
    return updateProfile(
      req,
      res,
      session.user.email
    );
  }

  return res.status(405).json({
    message: "Method not allowed.",
  });
}