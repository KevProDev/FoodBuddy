import { server } from "../config";

const profilefetcher = async (username) => {
  const profileData = await fetch(`${server}/api/account/${userName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const profile = await profileData.json();
  return profile;
};

const mealsFetcher = async () => {
  const getMealReview = await fetch(`${server}/api/newsFeed/pagination`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      previousCursor: initialMeals.previousCursor,
      userIdMealArray: initialMeals.userIdMealArray,
    }),
  });

  const reviews = await getMealReview.json();
  return reviews;
};
export const getProfileAndMeals = () => {
  const { data: profile } = useQuery("profileData", profilefetcher, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
  const { data } = useQuery("profileMeals", mealsFetcher, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
