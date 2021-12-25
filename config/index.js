const dev = process.env.NEXT_PUBLIC_VERCEL_ENV !== "production";

// export const server = dev ? "http://localhost:3000" : "http://localhost:3000";
export const server = dev
  ? "http://localhost:3000"
  : "http://www.meallocker.com";
