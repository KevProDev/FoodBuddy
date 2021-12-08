import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const primsa = new PrismaClient();

export default async function (req, res) {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401);
    }

    const {
      id,
      name,
      location: { address1: address },
      location: { city },
    } = req.body;

    // console.log(id);

    // const restaurant = await primsa.restaurant.create({
    //   data: { id, name, address, city },
    // });

    const getRestaurant = await primsa.restaurant.findUnique({
      where: {
        id: id,
      },
    });

    if (!getRestaurant) {
      const restaurant = await primsa.restaurant.create({
        data: { id, name, address, city },
      });
      return res.status(200).json(restaurant);
    }

    return res
      .status(200)
      .json({ Verdict: "This is a restaurant store already" });
  } catch (error) {
    return res.status(500).send(error);
  }
}
