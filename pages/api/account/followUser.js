import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function followUserHandler(req, res) {
  try {
    // const meals = await prisma.user.deleteMany({});
    // console.log(meals);

    if (req.method === "POST") {
      const session = await getSession({ req });
      const sessionUser = await prisma.user.findUnique({
        where: { id: session.id },
      });
      const profileUser = req.body;

      console.log("profileUser", profileUser);

      const userToFollow = await prisma.user.findUnique({
        where: {
          id: profileUser,
        },
        include: {
          following: true,
          followers: true,
        },
      });

      const isFollowing = await userToFollow.followers.find(
        (X) => X.user_id === sessionUser.id
      );

      if (!isFollowing) {
        console.log("is not Following so i follow", isFollowing);

        await prisma.follower.create({
          data: {
            user_id: sessionUser.id,
            follower_to_id: profileUser,
          },
        });

        await prisma.following.create({
          data: {
            user_id: profileUser,
            following_to_id: sessionUser.id,
          },
        });

        return res.status(200).json(userToFollow);
      }

      // console.log("sessionUser", sessionUser);

      // console.log("Follow User", profileUser);

      // console.log("userToFollow", userToFollow);

      // console.log("isFollowing", isFollowing);

      return res.status(200).json(userToFollow);
    }
  } catch (error) {
    res.status(500).json({ message: `Following User error - ${error}` });
  }
}
