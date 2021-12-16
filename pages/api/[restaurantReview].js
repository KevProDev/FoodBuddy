import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

// const prisma = new PrismaClient();

export default async function (req, res) {
  try {
    const restaurant_id = req.query.restaurantReview;

    const session = await getSession({ req });
    // res.status(200).json({ memo: "test" });

    if (!session) {
      return res.status(404);
    }

    const userFromDb = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (req.method === "POST") {
      const {
        id: rest_id,
        // name,
        // location: { address1: address },
        // location: { city },
        mealTitle: title,
        mealDescription: description,
      } = req.body;

      // Allow us to post the review on the meal

      await prisma.meal.create({
        data: {
          title: title,
          description: description,
          user_id: userFromDb.id.toString(),
          rest_id: rest_id.toString(),
          user_name: userFromDb.name.toString(),
        },
      });

      // findUnique is slow than findMany
      // const getRestaurantReview = await prisma.restaurant.findUnique({
      //   where: {
      //     id: rest_id,
      //   },
      //   include: {
      //     users_meals_review: {
      //       orderBy: {
      //         created_at: "desc",
      //       },
      //     },
      //   },
      // });
      const getRestaurantReview = await prisma.meal.findMany({
        where: {
          rest_id: rest_id,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return res.status(200).json(getRestaurantReview);
    }

    if (req.method === "GET") {
      const getRestaurantReview = await prisma.restaurant.findUnique({
        where: {
          id: restaurant_id,
        },
        include: {
          users_meals_review: {
            orderBy: {
              created_at: "desc",
            },
          },
        },
      });
      // const getRestaurantReview = await prisma.meal.findMany({
      //   where: {
      //     rest_id: restaurant_id,
      //   },
      //   orderBy: {
      //     created_at: "desc",
      //   },
      // });
      return res.status(200).json(getRestaurantReview.users_meals_review);
    }

    if (req.method === "DELETE") {
      const mealId = req.body;

      // async function deleteupdate()

      const meal = await prisma.meal.delete({
        where: {
          id: mealId,
        },
      });

      const getRestaurantReview = await prisma.meal.findMany({
        where: {
          rest_id: restaurant_id,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      return res.json(getRestaurantReview);

      // return res.json({
      //   message: meal ,
      // });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}
