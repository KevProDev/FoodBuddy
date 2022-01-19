import prisma from "../../lib/prisma";

export default async function followUserHandle(req, res) {
  try {
    if (req.method === "POST") {
      const userFromSession = req.body.session;

      console.log("DB User", userFromSession);

      const userFromDb = await prisma.user.findUnique({
        where: { id: userFromSession.id },
      });

      console.log(userFromDb);

      const followUser = await prisma.following.create({
        data: {
          following_to_id: "following user",
          user_id: userFromSession.id,
        },
      });

      // console.log(getFollow);
      return res.status(200).json({ status: "Success" });
    }
  } catch (error) {
    return res.status(500).json({ message: `Following error - ${error}` });
  }
}
