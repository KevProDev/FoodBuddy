// import nc from "next-connect";
// import restaurants from "../../../src/data/restaurants";

// const getRestaurant = (id) => restaurants.find((r) => r.id == id);

// const handler = nc().get((req, res) => {
//   // taking the query request and using it as the argument in our parameter
//   const restaurant = getRestaurant(req.query.id);
//   // if the restaurant not there send back a 404
//   if (!restaurant) {
//     res.status(404);
//     res.end();
//     return;
//   }
//   res.json(restaurant);
// });

// export default handler;
