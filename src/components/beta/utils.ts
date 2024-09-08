import { z } from "zod";

export const FUN_TYPE = ["Type 0", "Type 1", "Type 2", "Type 3"] as const;
export const funTypeMap: {
  [key in (typeof FUN_TYPE)[number]]: string;
} = {
  "Type 0": "Kind of boring, actually",
  "Type 1": "Straight up fun",
  "Type 2": "Hard in the moment, but fun to think of",
  "Type 3": "Damn, that was hard!",
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
