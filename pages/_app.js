import "tailwindcss/tailwind.css";
import { AppState } from "../context/store";

function MyApp({ Component, pageProps }) {
  return (
    <AppState>
      <Component {...pageProps} />
    </AppState>
  );
}

export default MyApp;
