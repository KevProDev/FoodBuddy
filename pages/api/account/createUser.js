import prisma from "../../../lib/prisma";

export default async function createUserHandler(req, res) {
  try {
    if (req.method === "POST") {
      const credentials = req.body;

      const createUser = await prisma.user.create({
        data: {
          name: credentials.name,
          password: credentials.password,
          email: credentials.email,
        },
        // select: {
        //   id: true,
        //   name: true,
        //   email: true,
        // },
      });

      console.log("createUser", createUser);
      return res.status(200).json(createUser);
    }
  } catch (error) {
    return res.status(500).json({ message: `Session error - ${error}` });
  }
}
