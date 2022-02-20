import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function getFollowersReviews(req, res) {
  const session = await getSession({ req });
  console.log(session);
  console.log("I MADE IT");

  try {
    if (session) {
      const user = await prisma.user.findUnique({
        where: {
          id: session.id,
        },
        include: {
          following: true,
          followers: true,
        },
      });
      return res.status(200).json({
        Results: "Session This works",
        User: user,
      });
    }
  } catch {
    return res.status(200).json({ status: "Success Error" });
  }
}
