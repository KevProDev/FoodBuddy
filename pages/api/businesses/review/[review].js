import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const restaurant_id = req.query.review;
  const session = await getSession({ req });

  try {
    if (req.method === "GET") {
      const getRestaurant = await prisma.restaurant.findUnique({
        where: {
          rest_id: restaurant_id,
        },
        include: {
          users_meals_review: {
            orderBy: {
              created_at: "desc",
            },
          },
        },
      });
      const user = await prisma.user.findUnique({
        where: {
          id: session.id,
        },
        include: {
          fav_meal: true,
        },
      });

      // console.log("RIGHT", getRestaurant);

      if (!getRestaurant) {
        await prisma.restaurant.create({
          data: {
            rest_id: restaurant_id,
            // name: dataYelp.name,
            // address: dataYelp.location.address1,
            // city: dataYelp.location.city,
          },
        });

        const data = {
          restaurantReviews: [],
          user: user,
          Where: "the resturant is not stored but store id",
        };

        // res.setHeader("Cache-Control", "s-maxage=86400");
        return res.status(200).json(data);
      }
      const data = {
        restaurantReviews: getRestaurant.users_meals_review,
        user: user,
        Where: "the resturant is stored",
      };
      // res.setHeader("Cache-Control", "s-maxage=86400");
      // return res.status(200).json({ data: getRestaurant });
      return res.status(200).json(data);
    }
    if (req.method === "POST") {
      const session = await getSession({ req });
      const { mealTitle: title, mealDescription: description } = req.body;

      console.log("ID", req.body.id);

      // console.log(req.body);

      const userFromDb = await prisma.user.findUnique({
        where: { id: session.id },
      });

      // Allow us to post the review on the meal

      const mealCreated = await prisma.meal.create({
        data: {
          title: title,
          description: description,
          user_id: userFromDb.id,
          user_image: userFromDb.image.toString(),
          rest_id: restaurant_id.toString(),
          user_name: userFromDb.name.toString(),
        },
      });

      return res.status(200).json({ status: "Success" });
      // return res.status(200).json(getRestaurantReview);
    }
    if (req.method === "DELETE") {
      const mealId = req.body.mealId;

      const deletedMeal = await prisma.meal.delete({
        where: {
          id: mealId,
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

      // return res.status(200).json(getRestaurantReview);
      return res.status(200).json({ status: "Success" });
    }
    // return res.status(200).json({ status: "Success" });
  } catch {}
}
