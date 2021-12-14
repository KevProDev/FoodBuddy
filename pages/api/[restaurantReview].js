import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import prisma from "../../lib/prisma";
import nc from "next-connect";

// const prisma = new PrismaClient();

export default async function (req, res) {
  try {
    // const session = await getSession({ req });

    // if (!session) {
    //   return res.status(401);
    // }

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

    if (req.method === "GET") {
      // console.log(req.query.restaurantReview);
      // return res.status(200).json({ name: "KEvin" });
      const restaurant_id = req.query.restaurantReview;
      // console.log(restaurant_id);
      const getRestaurantReview = await prisma.restaurant.findUnique({
        where: {
          id: restaurant_id,
        },
        select: {
          users_meals: true,
        },
      });
      // console.log(getRestaurantReview);
      return res.status(200).json(getRestaurantReview.users_meals);
    }
    return res.status(200).json({ name: "bottom res" });
  } catch (error) {
    return res.status(500).send(error);
  }
}

///////////////////////////
// const handler = nc().post(async (req, res) => {
//   try {
//     return res.status(200).json({ name: "Made it to the end" });
//     const session = await getSession({ req });

//     // if (!session) {
//     //   return res.status(401);
//     // }

//     const userFromDb = await prisma.user.findUnique({
//       where: { email: session.user.email },
//       select: {
//         id: true,
//       },
//     });

//     const {
//       id: restaurant_id,
//       name,
//       location: { address1: address },
//       location: { city },
//       mealTitle: title,
//       mealDescription: description,
//     } = req.body;

//     console.log("rest_id", req);
//     // const {
//     //   id: restaurant_id,
//     //   name,
//     //   location: { address1: address },
//     //   location: { city },
//     // } = req.body;
//     const getRestaurantId = await prisma.restaurant.findUnique({
//       where: {
//         id: restaurant_id,
//       },
//       select: {
//         id: true,
//       },
//     });

//     // Create a restaurant if one doesnt exsist
//     if (!getRestaurantId) {
//       const restaurant = await prisma.restaurant.create({
//         data: { id: restaurant_id, name, address, city },
//       });
//       return res.status(200).json(restaurant);
//     }

//     // Allow us to post the review on the meal
//     const sendMealReview = await prisma.meal.create({
//       data: {
//         title: title,
//         description: description,
//         user_id: userFromDb.id.toString(),
//         rest_id: getRestaurantId.id.toString(),
//       },
//     });
//     return res.status(200).json(sendMealReview);

//     // if (res.method === "GET") {
//     //   // return res.status(200).json({ name: "KEvin" });
//     //   // const restaurant_id = req.query.id;
//     //   // const getRestaurantReview = await prisma.restaurant.findUnique({
//     //   //   where: {
//     //   //     id: restaurant_id,
//     //   //   },
//     //   //   select: {
//     //   //     users_meals: true,
//     //   //   },
//     //   // });
//     //   return res.status(200).json({ name: "Made it to the end" });
//     // }
//     return res.status(200).json({ name: "Made it to the end" });
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// });

// export default handler;
