import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const primsa = new PrismaClient();

export default async function (req, res) {
  try {
    const {
      id,
      name,
      location: { address1: address },
      location: { city },
    } = req.body;

    // console.log(id);

    const session = await getSession({ req });

    if (!session) {
      return res.status(401);
    }

    const restaurant = await primsa.restaurant.create({
      data: { id, name, address, city },
    });

    return res.status(200).json(restaurant);
  } catch (error) {
    return res.status(500).send(error);
  }
}
