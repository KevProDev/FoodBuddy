import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const mealReviewUser = req.query.profile;

    // const session = await getSession({ req });

    // console.log("Sefekwlnfssion", session);

    const userFromDb = await prisma.user.findUnique({
      where: { name: mealReviewUser },
    });

    // console.log("userFromDb", userFromDb);

    return res.json(userFromDb);
  } catch {
    return res.json({ result: "fail" });
  }
}
