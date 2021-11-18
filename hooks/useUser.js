import { useState, useEffect, useContext } from "react";
import { useAppContext } from "../context/store";
import { getUserByUserId } from "../firebase/service/firebase";

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const appState = useAppContext();
  const { currentUser } = appState;

  useEffect(() => {
    async function getUserObjectByUserId() {
      const response = await getUserByUserId(currentUser.uid);
      setActiveUser(response);
    }
    // waiting til app renders and we have a currentuser before running the function below
    if (currentUser?.uid) {
      getUserObjectByUserId();
    }
  }, [currentUser]);

  return { user: activeUser };
}
