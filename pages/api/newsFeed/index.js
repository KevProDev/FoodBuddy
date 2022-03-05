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

      const meals = await prisma.meal.findMany({
        take: 10,
        where: {
          user_id: {
            in: userIdMealArray,
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });

      // Bookmark your location in the result set - in this
      // case, the ID of the last meal in the list of 4.

      const lastMealInResults = meals.slice(-1);
      // const lastMealInResults = meals[2];
      // Remember: zero-based index! :)
      const cursor = lastMealInResults[0].id; // Example: 29

      return res.status(200).json({
        user: user,
        meals: meals,
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
