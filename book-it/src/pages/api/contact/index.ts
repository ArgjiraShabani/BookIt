import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import {
  createContactMessage,
} from "controllers/contactController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return createContactMessage(req, res);
  }

  return res.status(405).json({
    message: "Method not allowed.",
  });
}