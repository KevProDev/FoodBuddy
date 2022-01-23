import prisma from "../../../lib/prisma";

export default async function signInHandler(req, res) {
  try {
    if (req.method === "POST") {
      const credentials = req.body;

      const user = await prisma.user.findUnique({
        where: {
          name: credentials.username,
        },
      });

      if (credentials.password === user.password) {
        return res.status(200).json(user);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: `Session error - ${error}` });
  }
}
