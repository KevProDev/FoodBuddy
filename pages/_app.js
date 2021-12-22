import "tailwindcss/tailwind.css";
import { Layout } from "../components/Layout";
import { AppState } from "../context/store";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Header from "./header";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppState>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AppState>
    </SessionProvider>
  );
}
