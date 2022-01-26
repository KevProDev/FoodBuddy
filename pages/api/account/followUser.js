import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function followUserHandler(req, res) {
  try {
    if (req.method === "POST") {
      const session = await getSession({ req });
      const userTryingToFollow = await prisma.user.findUnique({
        where: { id: session.id },
      });
      const userFromBrowers = req.body;

      const userToFollow = await prisma.user.findUnique({
        where: {
          id: userFromBrowers,
        },
        include: {
          following: true,
        },
      });

      // await prisma.following.create({
      //   data: {
      //     user_id: userTryingToFollow.id,
      //     following_to_id: userFromBrowers,
      //   },
      // });

      // const isFollowing = await prisma.user.findUnique({
      //   where: {
      //     id: session.id,
      //   },
      //   select: {
      //     following: {
      //       // where: {
      //       //   following_to_id: userFromBrowers,
      //       // },
      //       select: {
      //         following_to_id: true,
      //       },
      //     },
      //   },
      // });

      // const areYouFollowingUser = isFollowing[0].following[0];

      console.log("userTryingToFollow", userTryingToFollow);

      console.log("Follow User", userFromBrowers);

      console.log("userToFollow", userToFollow);

      // if (!areYouFollowingUser) {
      //   await prisma.following.create({
      //     data: {
      //       user_id: userTryingToFollow.id,
      //       following_to_id: userFromBrowers,
      //     },
      //   });

      //   // console.log("getFollow", getFollow);
      //   return res.status(200).json(isFollowing);
      // }

      // console.log("getFollow", getFollow);
      return res.status(200).json(userToFollow);
      return res.json({ result: "fail" });
    }
  } catch (error) {
    res.status(500).json({ message: `Following User error - ${error}` });
  }
}
