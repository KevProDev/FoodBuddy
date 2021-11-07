export default async function handler({ query: { id } }, res) {
  const apiKey = process.env.YELP_API_KEY;
  const baseUrl = "https://api.yelp.com/v3/businesses/";

  try {
    let query = await fetch(`${baseUrl}${id}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        accept: "application/json",
        "x-requested-with": "xmlhttprequest",
        "Access-Control-Allow-Origin": "*",
      },
    });
    let data = await query.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: `Server error - ${error}` });
  }
}
