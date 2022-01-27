import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    const mealReviewUser = req.query.profile;

    // const session = await getSession({ req });

    // console.log("Sefekwlnfssion", session);

    const userFromDb = await prisma.user.findUnique({
      where: { name: mealReviewUser },
      include: {
        following: true,
      },
    });

    const isFollowing = await userFromDb.following.find(
      (x) => x.user_id === session.id
    );

    console.log("isFollowing", isFollowing);

    // console.log("userFromDb", userFromDb);

    return res.json(userFromDb);
  } catch {
    return res.json({ result: "fail" });
  }
}
