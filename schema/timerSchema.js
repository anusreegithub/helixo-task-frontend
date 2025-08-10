import { z } from "zod";

const schema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Timer name is required"),
  description: z.string().optional(),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  size: z.enum(["Small", "Medium", "Large"]),
  position: z.enum(["Top", "Bottom"]),
  color: z.string().optional(),
});

export default schema;
