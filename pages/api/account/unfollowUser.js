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

      console.log("profileUser", profileUser);

      const profileUserToUnFollow = await prisma.user.findUnique({
        where: {
          id: profileUser,
        },
        include: {
          following: true,
          followers: true,
        },
      });

      const clientUser = await prisma.user.findUnique({
        where: {
          id: session.id,
        },
        include: {
          following: true,
          followers: true,
        },
      });

      // const userFollowerExist = await profileUserToUnFollow.following.find(
      //   (X) => X.following_to_id === profileUser
      // );

      console.log("WORK");

      const userFollowerExist = await profileUserToUnFollow.followers.find(
        (X) => X.user_id === session.id
      );

      const unFollowId = await clientUser.following.find(
        (x) => x.user_id === profileUser
      );

      console.log("unFollowId", unFollowId);

      if (userFollowerExist) {
        console.log("is Following so i unfollow");
        // await prisma.following.delete({
        //   where: {
        //     id: userFollowerExist.id,
        //   },
        // });
        await prisma.follower.delete({
          where: {
            id: userFollowerExist.id,
            // follower_to_id: profileUser,
            // user_id: session.id,
          },
        });
        await prisma.following.delete({
          where: {
            id: unFollowId.id,
            // follower_to_id: profileUser,
            // user_id: session.id,
          },
        });
      }

      // return res.status(200).json({ Resonse: "YES" });
      return res.status(200).json(profileUserToUnFollow);
    }
  } catch (error) {
    res.status(500).json({ message: `Following User error - ${error}` });
  }
}
