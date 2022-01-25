import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function followUserHandler(req, res) {
  try {
    if (req.method === "POST") {
      const session = await getSession({ req });

      const userFromDb = await prisma.user.findUnique({
        where: { id: session.id },
      });

      console.log("userFromDb", userFromDb);

      const userFromBrowers = req.body;

      console.log("Follow User", userFromBrowers);

      await prisma.following.create({
        data: {
          user_id: userFromDb.id,
          following_to_id: userFromBrowers,
        },
      });

      // console.log("getFollow", getFollow);
      return res.status(200).json({ status: "Success" });
    }
  } catch (error) {
    res.status(500).json({ message: `Following User error - ${error}` });
  }
}
