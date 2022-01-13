export default async function handler(req, res) {
  const apiKey = process.env.YELP_API_KEY;
  const baseUrl = "https://api.yelp.com/v3/businesses/";

  try {
    // res.status(200).json({ memo: "test" });
    let query = await fetch(`${baseUrl}${req.query.id}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        accept: "application/json",
        "x-requested-with": "xmlhttprequest",
        "Access-Control-Allow-Origin": "*",
      },
    });
    let dataYelp = await query.json();

    const restaurant_id = req.query.id;
    console.log(restaurant_id);

    // check to see if REST is on the DATABASE
    const getRestaurant = await prisma.restaurant.findUnique({
      where: {
        id: restaurant_id,
      },
    });

    // If the REST IS NOT THERE SAVE the data
    if (!getRestaurant) {
      // const restaurant_id = req.query.id;

      await prisma.restaurant.create({
        data: {
          id: restaurant_id,
          name: dataYelp.name,
          address: dataYelp.location.address1,
          city: dataYelp.location.city,
        },
      });

      return res.status(200).json(dataYelp);
    }
    // res.setHeader("Cache-Control", "s-maxage=86400");
    return res.status(200).json(dataYelp);

    // SAVE REST DATA TO SERVER ON FIRST REQUEST
    if (req.method === "POST") {
      // check to see if REST is on the DATABASE
      const getRestaurant = await prisma.restaurant.findUnique({
        where: {
          id: restaurant_id,
        },
      });

      // If the REST IS NOT THERE SAVE the data
      if (!getRestaurant) {
        const restaurant_id = req.query.id;

        await prisma.restaurant.create({
          data: {
            id: restaurant_id,
            name: dataYelp.name,
            address: dataYelp.location.address1,
            city: dataYelp.location.city,
          },
        });

        return res.status(200).json(dataYelp);

        // const {
        //   id: restaurant_id,
        //   // name,
        //   // location: { address1: address },
        //   // location: { city },
        //   // mealTitle: title,
        //   // mealDescription: description,
        // } = req.body;

        // res.setHeader("Cache-Control", "s-maxage=86400");
        // return res.status(200).json(dataYelp);
        // return res.status(200).json({ results: "Yes it Work" });

        // const data = {
        //   dataYelp,
        //   restaurantReviews: [],
        //   Where: "the resturant is not stored but store id",
        // };

        // res.setHeader("Cache-Control", "s-maxage=86400");
        // return res.status(200).json(data);
      }
      // const data = {
      //   dataYelp,
      //   restaurantReviews: getRestaurant.users_meals_review,
      //   Where: "the resturant is stored",
      // };
      // res.setHeader("Cache-Control", "s-maxage=86400");
      return res.status(200).json({ main: "main return" });
    }

    // if (req.method === "GET") {
    //   const getRestaurant = await prisma.restaurant.findUnique({
    //     where: {
    //       id: restaurant_id,
    //     },
    //     include: {
    //       users_meals_review: {
    //         orderBy: {
    //           created_at: "desc",
    //         },
    //       },
    //     },
    //   });

    //   if (!getRestaurant) {
    //     await prisma.restaurant.create({
    //       data: {
    //         id: restaurant_id,
    //         name: dataYelp.name,
    //         address: dataYelp.location.address1,
    //         city: dataYelp.location.city,
    //       },
    //     });

    //     const data = {
    //       dataYelp,
    //       restaurantReviews: [],
    //       Where: "the resturant is not stored but store id",
    //     };

    //     // res.setHeader("Cache-Control", "s-maxage=86400");
    //     return res.status(200).json(data);
    //   }
    //   const data = {
    //     dataYelp,
    //     restaurantReviews: getRestaurant.users_meals_review,
    //     Where: "the resturant is stored",
    //   };
    //   // res.setHeader("Cache-Control", "s-maxage=86400");
    //   return res.status(200).json(data);
    // }

    res.status(500).json({ message: `Server error - ${error}` });
  } catch (error) {
    res.status(500).json({ message: `Server error - ${error}` });
  }
}
