import prisma from "../../../lib/prisma";

export default async function signInHandler(req, res) {
  try {
    if (req.method === "POST") {
      const credentials = req.body;
      console.log(credentials);

      const user = await prisma.user.findUnique({
        where: {
          email: credentials.email,
        },
      });

      console.log(user);

      if (!user) {
        const createUser = await prisma.user.create({
          data: {
            email: credentials.email,
            password: credentials.password,
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        });

        return res.status(200).json(createUser);
      }

      if (credentials.password === user.password) {
        return res.status(200).json(user);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: `Session error - ${error}` });
  }
}
