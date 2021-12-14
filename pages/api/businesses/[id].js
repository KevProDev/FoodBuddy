import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const apiKey = process.env.YELP_API_KEY;
  const baseUrl = "https://api.yelp.com/v3/businesses/";

  try {
    let query = await fetch(`${baseUrl}${req.query.id}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        accept: "application/json",
        "x-requested-with": "xmlhttprequest",
        "Access-Control-Allow-Origin": "*",
      },
    });
    let dataYelp = await query.json();
    if (req.method === "GET") {
      const restaurant_id = req.query.id;
      const getRestaurantReview = await prisma.restaurant.findUnique({
        where: {
          id: restaurant_id,
        },
        select: {
          users_meals: true,
        },
      });
      if (!getRestaurantReview) {
        const data = {
          dataYelp,
          getRestaurantReview: [],
        };
        return res.status(200).json(data);
      }

      const data = {
        dataYelp,
        getRestaurantReview: getRestaurantReview.users_meals,
      };
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const session = await getSession({ req });
      // res.status(200).json({ memo: "test" });

      if (!session) {
        return res.status(404);
      }

      const userFromDb = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      const {
        id: restaurant_id,
        name,
        location: { address1: address },
        location: { city },
        mealTitle: title,
        mealDescription: description,
      } = req.body;

      // res.status(200).json(userFromDb);

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
        await prisma.restaurant.create({
          data: { id: restaurant_id, name, address, city },
        });

        const getRestaurantId = await prisma.restaurant.findUnique({
          where: {
            id: restaurant_id,
          },
          select: {
            id: true,
          },
        });

        const sendMealReview = await prisma.meal.create({
          data: {
            title: title,
            description: description,
            user_id: userFromDb.id.toString(),
            rest_id: getRestaurantId.id.toString(),
            user_name: userFromDb.name.toString(),
          },
        });
        return res.status(200).json(sendMealReview);
        // return res.status(200).json(restaurant);
      }

      // Allow us to post the review on the meal

      const sendMealReview = await prisma.meal.create({
        data: {
          title: title,
          description: description,
          user_id: userFromDb.id.toString(),
          rest_id: getRestaurantId.id.toString(),
          user_name: userFromDb.name.toString(),
        },
      });
      return res.status(200).json(sendMealReview);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: `Server error - ${error}` });
  }
}
