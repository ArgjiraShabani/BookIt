import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "lib/mongodb";
import Contact from "models/Contact";

export async function createContactMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Please fill in all fields.",
      });
    }

    const contactMessage = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      message: "Message sent successfully.",
      contactMessage,
    });
  } catch (error) {
    console.error("Contact error:", error);

    return res.status(500).json({
      message: "Failed to send message.",
    });
  }
}