import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

// const prisma = new PrismaClient();

export default async function (req, res) {
  const restaurant_id = req.query.likes;
  console.log(restaurant_id);

  if (req.method === "PUT") {
    try {
      res.status(200).json({
        diditwork: "Yes It Did",
      });
    } catch (e) {
      console.log(e);
    }
  }
  try {
  } catch (error) {
    return res.status(500).send(error);
  }
}
