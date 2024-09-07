import { z } from "zod";

export const baseFormSchema = z.object({
  title: z.string().min(2).max(500),
  body: z.string().min(100).max(10_000),
  date: z.date(),
  difficulty: z.number().min(1).max(5),
  fun: z.number().min(1).max(5),
  doItAgain: z.boolean(),
});
export const categoryOptions = [
  { label: "Bike", value: "bike" },
  { label: "Hike", value: "hike" },
];
export const subcategoryOptions = {
  hike: [
    { label: "Hiking", value: "hiking" },
    { label: "Trail Running", value: "trailRunning" },
    { label: "Backpacking", value: "backpacking" },
  ],
  bike: [
    { label: "Road Cycling", value: "road" },
    { label: "Gravel / All-Road Cycling", value: "gravel" },
    { label: "Trail / MTB", value: "mtb" },
  ],
};
