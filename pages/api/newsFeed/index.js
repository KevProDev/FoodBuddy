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
        take: 3,
        where: {
          user_id: {
            in: userIdMealArray,
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });

      // // Bookmark your location in the result set - in this
      // // case, the ID of the last meal in the list of 4.

      // const lastMealInResults = firstMealQueryResults[1]; // Remember: zero-based index! :)
      // const myCursor = lastMealInResults.id; // Example: 29

      // console.log("firstMealQueryResults", firstMealQueryResults);

      // for (let i = 0; i < (await meals.length); ++i) {
      //   restaurantIdArray[i] = await meals[i].rest_id;
      // }

      // const userMealsRestaurants = await prisma.restaurant.findMany({
      //   where: {
      //     rest_id: restaurantIdArray,
      //   },
      //   include: {
      //     fav_meal: true,
      //   },
      // });

      // console.log("restaurantIdArray", restaurantIdArray);

      // const meals = await prisma.restaurant.findMany({
      //   where: {
      //     rest_id: {
      //       in: ,
      //     },
      //   },
      // });

      // const restaurant = await prisma.restaurant.findMany({
      //   where: {
      //     rest_id: {
      //       in:
      //     }
      //   },
      //   include: {

      //   }
      // });

      // const restaurantIdArray = new Array(await meals.length);

      // for (let i = 0; i < restaurantIdArray.length; ++i) {
      //   restaurantIdArray[i] = await meals[i].rest_id;
      // }

      // const restaurants = await prisma.restaurant.findMany({
      //   where: {
      //     rest_id: {
      //       in: restaurantIdArray,
      //     },
      //   },
      // });

      // const formatFriendsMealsWithRestaurant = ()=> {

      //   const mealsWithRestaurantObject = {
      //     mealsWithRestaurant: meals
      //   }

      //   for (let i = 0; i < await meals.length; i++){

      //     mealsWithRestaurant[i] = mealsWithRestaurant[i].restaurant

      //   }

      // }

      // console.log("restaurants", restaurants);

      return res.status(200).json({
        user: user,
        meals: meals,
        // firstMealQueryResults: firstMealQueryResults,
      });
    }
    return res.status(200).json({
      Results: "No session",
    });
  } catch {
    return res.status(200).json({ status: "Success Error" });
  }
}
