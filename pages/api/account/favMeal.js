import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function mealFavoriteHandler(req, res) {
  try {
    const session = await getSession({ req });
    const user = await prisma.user.findUnique({
      where: {
        id: session.id,
      },
      include: {
        fav_meal: true,
      },
    });

    const mealId = req.body.meal_id;

    if (req.method === "POST") {
      const saveFavoriteMeal = await prisma.favorite_Meal.create({
        data: {
          meal_id: mealId,
          user_id: user.id,
        },
      });

      // console.log("mealIdFromDb", mealIdFromDb);

      // console.log("user", user);
    }

    if (req.method === "DELETE") {
      const mealIdFromDb = await user.fav_meal.find(
        (x) => x.meal_id === mealId
      );

      console.log("mealIdFromDb", mealIdFromDb);
      const deleteMeal = await prisma.favorite_Meal.delete({
        where: {
          id: mealIdFromDb.id,
        },
      });
    }
    res.status(200).json({
      Result: "YES it works",
    });
  } catch (error) {
    res.status(500).json({ message: `Following User error - ${error}` });
  }
}
