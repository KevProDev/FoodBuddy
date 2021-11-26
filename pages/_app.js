import "tailwindcss/tailwind.css";
import { Layout } from "../components/Layout";
import { AppState } from "../context/store";
import { SessionProvider } from "next-auth/react";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppState>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppState>
    </SessionProvider>
  );
}
