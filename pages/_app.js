import "tailwindcss/tailwind.css";
import { AppState } from "../context/store";

export default function MyApp({ Component, ...pageProps }) {
  return (
    <AppState>
      <Component {...pageProps} />
    </AppState>
  );
}

// export const getStaticProps = async (context) => {
//   try {
//     const cookies = nookies.get(context);
//     const token = await verifyIdToken(cookies.token);
//     const { email } = token;
//     const collectionRef = collection(db, "users");
//     const q = query(collectionRef, where("email", "==", email));
//     const querySnapshot = await getDocs(q);
//     let usersList = [];
//     querySnapshot.forEach((doc) => {
//       usersList.push({ ...doc.data(), id: doc.id });
//     });
//   } catch {}

//   return {
//     props: {
//       userToken: "",
//     },
//   };
// };
