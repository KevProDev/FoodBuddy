import prisma from "../../../lib/prisma";
export default async function likeHandler(req, res) {
  try {
    if (req.method === "POST") {
      const { meal_id, session } = req.body;

      console.log(req.body);

      const likeMeal = await prisma.meal.update({
        where: {
          id: meal_id,
        },
        data: {
          like_count: {
            increment: 1,
          },
        },
      });

      return res.status(200).json({ Status: "Saved" });
    }
    if (req.method === "DELETE") {
      const { meal_id, session } = req.body;

      console.log(req.body);

      const likeMeal = await prisma.meal.update({
        where: {
          id: meal_id,
        },
        data: {
          like_count: {
            decrement: 1,
          },
        },
      });

      return res.status(200).json({ Status: "Saved" });
    }
  } catch (error) {
    return res.status(500).json({ message: `Session error - ${error}` });
  }
}
