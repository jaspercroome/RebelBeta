import { Database, Tables } from "./supabase/types";

export const getStatus = (safetyRating: Tables<"beta">["safety_rating"]) => {
  switch (safetyRating) {
    case "green":
      return { icon: "🟢", description: "easy going - full send!" };
    case "blue":
      return {
        icon: "🟦",
        description: "good to go, but only with the right gear",
      };
    case "black":
      return {
        icon: "⚫️",
        description: "go for it, but only with the right skill and gear",
      };
    case "red":
      return { icon: "❌", description: "don't go for it right now" };
  }
};
