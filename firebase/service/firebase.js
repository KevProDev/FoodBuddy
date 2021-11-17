import { db } from "../clientApp";
import { collection, getDocs, query, where } from "firebase/firestore";

// get user from the firestore where userId === userId (passed from auth)
export async function getUserByUserId(userId) {
  const collectionRef = collection(db, "users");
  const results = query(collectionRef, where("userId", "==", userId));
  const data = await getDocs(results);
  const [user] = data.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  return user;
}
