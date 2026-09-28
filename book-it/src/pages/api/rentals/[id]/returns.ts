import type {
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth/next";

import { authOptions } from "../../auth/[...nextauth]";
import { returnRental } from "controllers/rentalController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({
      message: "Method not allowed.",
    });
  }

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

  return returnRental(req, res);
}