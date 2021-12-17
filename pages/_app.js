import "tailwindcss/tailwind.css";
import { Layout } from "../components/Layout";
import { AppState } from "../context/store";
import { SessionProvider } from "next-auth/react";
import Header from "./header";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <AppState>
        <Header />
        <Component {...pageProps} />
      </AppState>
    </SessionProvider>
  );
}
