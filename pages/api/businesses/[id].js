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
    return res.status(200).json(dataYelp);

    const restaurant_id = req.query.id;

    if (req.method === "GET") {
      const getRestaurant = await prisma.restaurant.findUnique({
        where: {
          id: restaurant_id,
        },
        include: {
          users_meals_review: {
            orderBy: {
              created_at: "desc",
            },
          },
        },
      });

      if (!getRestaurant) {
        await prisma.restaurant.create({
          data: {
            id: restaurant_id,
            name: dataYelp.name,
            address: dataYelp.location.address1,
            city: dataYelp.location.city,
          },
        });

        const data = {
          dataYelp,
          restaurantReviews: [],
          Where: "the resturant is not stored but store id",
        };

        // res.setHeader("Cache-Control", "s-maxage=86400");
        return res.status(200).json(data);
      }
      const data = {
        dataYelp,
        restaurantReviews: getRestaurant.users_meals_review,
        Where: "the resturant is stored",
      };
      // res.setHeader("Cache-Control", "s-maxage=86400");
      return res.status(200).json(data);
    }

    res.status(500).json({ message: `Server error - ${error}` });
  } catch (error) {
    res.status(500).json({ message: `Server error - ${error}` });
  }
}
