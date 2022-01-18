import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });

    const userFromDb = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    return res.json(session);
  } catch {
    return res.json({ result: "fail" });
  }
}
