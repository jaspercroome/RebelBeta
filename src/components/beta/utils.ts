import { z } from "zod";

export const FUN_TYPE = ["Type 0", "Type 1", "Type 2", "Type 3"] as const;
export const funTypeMap: {
  [key in (typeof FUN_TYPE)[number]]: string;
} = {
  "Type 0": "😴 - zzzzzz",
  "Type 1": "😜 - weeeee",
  "Type 2": "🥵/😅 - ouch, but yay",
  "Type 3": "😵 - just ouch",
};

export const spicinessMap: {
  [key in 1 | 2 | 3 | 4 | 5]: string;
} = {
  1: "🧊 - so chill",
  2: "🥛 - pretty chill",
  3: "🫑 - decent",
  4: "🌶️ - spicy",
  5: "🔥 - yowzers",
};

export const doItAgainMap = {
  true: "👍 - Yeah, I'd do it again",
  false: "👎 - Nope, Not doing that again",
};

export const baseFormSchema = {
  title: z.string().min(2).max(500),
  body: z.string().min(100).max(10_000),
  date: z.date(),
  location: z.array(z.number().min(-180).max(180), z.number().min(-45).max(45)),
  funType: z.enum(FUN_TYPE),
  doItAgain: z.boolean(),
};

export interface Option {
  label: string;
  value: string;
}

export enum CategoryOption {
  BIKE = "Bike",
  HIKE = "Hike",
}
export enum SubCategoryBikeOption {
  GRAVEL = "Gravel",
  TRAILMTB = "Trail / MTB",
  BIKEPACKING = "Bikepacking",
  ROAD = "Road",
}
export enum SubCategoryHikeOption {
  HIKING = "Hiking",
  BACKPACKING = "BackPacking",
  TRAILRUNNING = "Trail Running",
}

export const saveFormLocally = (data: object, formTitle: string) => {
  const saveDate = new Date().toUTCString();
  const storageItem = { saveDate, data };
  localStorage.setItem(formTitle, JSON.stringify(storageItem));
};
export const retrieveLocalForm = (formTitle: string) => {
  const item = localStorage.getItem(formTitle);
  if (item) {
    return JSON.parse(item) as {
      saveDate: string;
      data: object;
    };
  }
};
export const clearLocalForm = (formTitle: string) => {
  localStorage.removeItem(formTitle);
};
