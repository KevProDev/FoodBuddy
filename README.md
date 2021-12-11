# FoodBuddy

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [PlanetScale](https://planetscale.com/)
- **ORM**: [Prisma](https://prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

- `context/*` - Holds restaurant data using useReducer and react context.
- `lib/*` - Short for "library", a collection of helpful utilities or code for external services.
- `pages/api/createMealReview` - This route tells primsa to add your meal review to a restaurant in the database
- `pages/api/busines/search` - [API route](https://nextjs.org/docs/api-routes/introduction) that fetch a list restaurants from Yelp API
- `pages/api/busines/[id]` - [API route](https://nextjs.org/docs/api-routes/introduction) that fetches a particular restaurant from Yelp API
- `pages/restaurant/[id]` - Dynamic Static pre-rendered restaurant pages.
- `pages/*` - All other static pages.
- `prisma/*` - My Prisma schema, which uses a PlanetScale MySQL database.
- `public/*` - Static assets including fonts and images.
- `scripts/*` - Scripts to generate a sitemap.
- `styles/*` - Mostly using vanilla Tailwind CSS a small amount of global styles.
