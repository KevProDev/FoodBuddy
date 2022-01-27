import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function unFollowUserHandler(req, res) {
  try {
    if (req.method === "POST") {
      const session = await getSession({ req });
      const sessionUser = await prisma.user.findUnique({
        where: { id: session.id },
      });
      const profileUser = req.body;

      const userToUnFollow = await prisma.user.findUnique({
        where: {
          id: profileUser,
        },
        include: {
          following: true,
        },
      });

      const checkIsFollowing = await userToUnFollow.following.find(
        (X) => X.following_to_id === profileUser
      );

      if (checkIsFollowing) {
        console.log("is Following so i unfollow");
        await prisma.following.delete({
          where: {
            id: checkIsFollowing.id,
          },
        });
      }

      // console.log("sessionUser", sessionUser);

      // console.log("Follow User", profileUser);

      // console.log("userToUnFollow", userToUnFollow);

      // console.log("checkIsFollowing", checkIsFollowing);

      return res.status(200).json(userToUnFollow);
    }
  } catch (error) {
    res.status(500).json({ message: `Following User error - ${error}` });
  }
}
