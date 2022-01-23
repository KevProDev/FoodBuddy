import prisma from "../../../lib/prisma";

export default async function followUserHandler(req, res) {
  try {
    if (req.method === "POST") {
      const userFromBrowers = req.body.session;

      console.log("DB User", userFromBrowers);

      // const userFromDb = await prisma.user.findUnique({
      //   where: { id: userFromBrowers.id },
      // });

      // console.log(userFromDb);

      const followUser = await prisma.following.create({
        data: {
          user_id: userFromBrowers.id,
          following_to_id: userFromBrowers.otherUser.id,
        },
      });

      // console.log(getFollow);
      return res.status(200).json({ status: "Success" });
    }
  } catch {
    res.status(500).json({ message: `Following User error - ${error}` });
  }
}
