import { useState, useEffect } from "react";
import { useAppContext } from "../context/store";
import Skeleton from "react-loading-skeleton";

export default function Suggestions() {
  console.log("Suggestions Function Begin");

  // console.log("Suggestions custom hook", user);

  // const appState = useAppContext();
  // const { currentUser } = appState;
  // console.log("suggestion currentUser", currentUser);

  // const [profiles, setProfiles] = useState(null);

  // //go ahead and get the user suggested profiles
  // useEffect(() => {
  //   async function suggestedProfiles(){
  //     const response = await getSuggestedProfiles(userId)

  //   }
  // }
  // ),[currentUser]

  // return !currentUser ? <Skeleton count={1} height={150} /> : (
  //   <div>
  //     {console.log("Suggestions HTML BEGIN")}
  //     List of users
  //   </div>
  // );
  return (
    <div>
      {console.log("Suggestions HTML BEGIN")}
      List of users
    </div>
  );
}
