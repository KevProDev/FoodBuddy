import { useEffect, useState, createContext, useContext } from "react";
import { auth } from "../../firebase/clientApp";
// import { signInWithPopup } from "firebase/auth";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        console.log("no user");
        return;
      }

      const token = await user.getIdToken();
      console.log("user token", token);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// const login = () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info
//       const user = result.user;
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.errorMessage;
//       // The email of the users account used.
//       const email = error.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//     });
// };

// const logout = () => {
//   auth.signOut();
//   console.log("logout");
// };
