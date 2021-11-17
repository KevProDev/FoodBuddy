import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import appReducer from "./reducer";
import { server } from "../config/index";
import { auth, db } from "../firebase/clientApp";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import nookies from "nookies";

const AppContext = createContext();

export function AppState({ children }) {
  console.log("AppState Function Begin");
  // The State of the App initialized
  let appState = {
    businesses: [],
    total: 0,
    limit: 20,
    offset: 0,
    term: "",
    location: "Chicago",
    sortBy: "best_match",
    mapCenterCoords: {
      lat: 0,
      lng: 0,
    },
    loading: false,
    currentUser: "",
    // isAuth: false,
    // username: "",
    // token: "",
  };

  // using useReducer help us not have to use callbacks, this allows us to use dispatch with types of action we want to perform and payload as parameters.
  const [state, dispatch] = useReducer(appReducer, appState);
  const [currentUser, setCurrentUser] = useState(null);

  const searchBusinesses = async (term, location, sortBy, offset) => {
    try {
      setLoading();

      const res = await fetch(
        `${server}/api/businesses/search?limit=${appState.limit}&offset=${offset}&term=${term}&location=${location}&sort_by=${sortBy}`
      );

      const data = await res.json();

      dispatch({
        type: "SEARCH_BUSINESSES",
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: "STOP_LOADING",
      });
      console.error(err.message);
    }
  };

  const setSearchParams = (params) => {
    const data = {
      terms: params.term ? params.term : appState.term,
      location: params.location ? params.location : appState.location,
      sortBy: params.sortBy ? params.sortBy : appState.sortBy,
    };
    dispatch({
      type: "SET_SEARCH_PARAMS",
      payload: data,
    });
  };

  const clearBusinesses = () => dispatch({ type: "CLEAR_BUSINESSES" });
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  /// FIREBASE

  useEffect(function CheckAuthOfUserHandler() {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        console.log("AppState UseEffect Begin");
        console.log("no user");
        setCurrentUser(null);
        nookies.set(undefined, "token", "", {});
        // dispatch({
        //   type: "LOGOUT",
        // });
        return;
      }
      const token = await user.getIdToken();
      nookies.set(undefined, "token", token, {});
      // const userData = {
      //   displayName: user.displayName,
      //   email: user.email,
      //   lastSeen: serverTimestamp(),
      //   photoURL: user.photoURL,
      // };
      // await setDoc(doc(db, "users", user.uid), userData);
      // console.log("user name from store", user.displayName);
      // console.log("all of user data from database", user);
      console.log("AppState UseEffect Begin");
      setCurrentUser(user);
      dispatch({
        type: "LOGIN",
        payload: user,
      });
    });
  }, []);
  return (
    <AppContext.Provider
      value={{
        businesses: state.businesses,
        total: state.total,
        limit: state.limit,
        offset: state.offset,
        term: state.term,
        location: state.location,
        sortBy: state.sortBy,
        mapCenterCoords: state.mapCenterCoords,
        loading: state.loading,
        clearBusinesses,
        searchBusinesses,
        setSearchParams,
        currentUser: currentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
