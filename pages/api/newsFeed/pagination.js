import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function pagination(req, res) {
  const session = await getSession({ req });
  const { previousCursor, userIdMealArray } = req.body;
  console.log(previousCursor);

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

      const meals = await prisma.meal.findMany({
        take: 10,
        skip: 1,
        cursor: {
          id: previousCursor,
        },
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
      // Remember: zero-based index! :)
      const cursor = lastMealInResults[0].id; // Example: 29

      return res.status(200).json({
        user: user,
        meals: meals,
        cursor: cursor,
      });
    }
    return res.status(200).json({
      Results: "No session",
    });
  } catch {
    return res.status(200).json({ status: "Success Error" });
  }
}
