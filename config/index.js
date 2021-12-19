const dev = process.env.NEXT_PUBLIC_VERCEL_ENV !== "production";

console.log(dev);

export const server = dev ? "http://localhost:3000" : "http://localhost:3000";
