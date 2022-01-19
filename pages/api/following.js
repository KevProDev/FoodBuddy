import prisma from "../../lib/prisma";

export default async function followingHandle(req, res) {
  try {
    if (req.method === "GET") {
      const userFromDb = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      const getFollow = await prisma.following.findMany({
        where: {
          following_to_id: userFromDb.id,
        },
      });

      console.log(getFollow);
      return res.status(200).json({ status: "Success" });
    }
  } catch (error) {
    return res.status(500).json({ message: `Following error - ${error}` });
  }
}
