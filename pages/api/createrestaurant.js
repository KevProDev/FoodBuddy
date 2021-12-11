import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req, res) {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401);
    }

    if (req.method === "POST") {
      const userFromDb = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {
          id: true,
        },
      });

      const {
        id: restaurant_id,
        name,
        location: { address1: address },
        location: { city },
        mealTitle: title,
        mealDescription: description,
      } = req.body;

      // console.log(title);
      // const {
      //   id: restaurant_id,
      //   name,
      //   location: { address1: address },
      //   location: { city },
      // } = req.body;

      const getRestaurantId = await prisma.restaurant.findUnique({
        where: {
          id: restaurant_id,
        },
        select: {
          id: true,
        },
      });

      // Create a restaurant if one doesnt exsist
      if (!getRestaurantId) {
        const restaurant = await prisma.restaurant.create({
          data: { id: restaurant_id, name, address, city },
        });
        return res.status(200).json(restaurant);
      }

      // Allow us to post the review on the meal

      const sendMealReview = await prisma.meal.create({
        data: {
          title: title,
          description: description,
          user_id: userFromDb.id.toString(),
          rest_id: getRestaurantId.id.toString(),
        },
      });
      return res.status(200).json(sendMealReview);
    }

    return res.status(200).json(getRestaurantId);
  } catch (error) {
    return res.status(500).send(error);
  }
}