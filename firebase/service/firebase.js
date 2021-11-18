import { db } from "../clientApp";
import { collection, getDocs, query, where } from "firebase/firestore";

// get user from the firestore where userId === userId (passed from auth)
export async function getUserByUserId(userId) {
  const collectionRef = collection(db, "users");
  const data = query(collectionRef, where("userId", "==", userId));
  const results = await getDocs(data);
  const [user] = results.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  return user;
}
