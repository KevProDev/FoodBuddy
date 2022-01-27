import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function followUserHandler(req, res) {
  try {
    if (req.method === "POST") {
      const session = await getSession({ req });
      const sessionUser = await prisma.user.findUnique({
        where: { id: session.id },
      });
      const profileUser = req.body;

      const userToFollow = await prisma.user.findUnique({
        where: {
          id: profileUser,
        },
        include: {
          following: true,
        },
      });

      const checkIsFollowing = await userToFollow.following.find(
        (X) => X.following_to_id === profileUser
      );

      if (!checkIsFollowing) {
        console.log("is not Following so i follow");
        await prisma.following.create({
          data: {
            user_id: sessionUser.id,
            following_to_id: profileUser,
          },
        });

        return res.status(200).json(userToFollow);
      }

      // console.log("sessionUser", sessionUser);

      // console.log("Follow User", profileUser);

      // console.log("userToFollow", userToFollow);

      // console.log("checkIsFollowing", checkIsFollowing);

      return res.status(200).json(userToFollow);
    }
  } catch (error) {
    res.status(500).json({ message: `Following User error - ${error}` });
  }
}
