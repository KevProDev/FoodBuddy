import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function getFollowersReviews(req, res) {
  const session = await getSession({ req });

  try {
    if (session) {
      const user = await prisma.user.findUnique({
        where: {
          id: session.id,
        },
        include: {
          following: true,
        },
      });

      const userIdMealArray = new Array(await user.following.length);
      // const restaurantIdArray = new Array(await user.following.length);

      for (let i = 0; i < (await user.following.length); ++i) {
        userIdMealArray[i] = await user.following[i].user_id;
      }

      // const meals = await prisma.meal.findMany({
      //   where: {
      //     user_id: {
      //       in: userIdMealArray,
      //     },
      //   },
      // });

      const initialMeals = await prisma.meal.findMany({
        take: 2,
        where: {
          user_id: {
            in: userIdMealArray,
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });

      // const nextMeals = await prisma.meal.findMany({
      //   take: 10,
      //   cursor: {
      //     id: initialMeals[initialMeals.length - 1].id,
      //   },
      //   where: {
      //     user_id: {
      //       in: userIdMealArray,
      //     },
      //   },
      //   orderBy: {
      //     created_at: "desc",
      //   },
      // });

      // console.log(nextMeals);
      // Bookmark your location in the result set - in this
      // case, the ID of the last meal in the list of 4.

      const lastMealInResults = initialMeals.slice(-1);
      // const lastMealInResults = meals[2];
      // Remember: zero-based index! :)
      const cursor = lastMealInResults[0].id; // Example: 29

      return res.status(200).json({
        user: user,
        initialMeals: initialMeals,
        // meals: nextMeals,
        previousCursor: cursor,
        userIdMealArray: userIdMealArray,
      });
    }
    return res.status(200).json({
      Results: "No session",
    });
  } catch {
    return res.status(200).json({ status: "Success Error" });
  }
}
