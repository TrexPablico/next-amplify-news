// schemas/postSchema.ts

import * as z from "zod";

const postSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(20, { message: "Title cannot exceed 20 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description cannot exceed 500 characters" }),

  content: z
    .string()
    .min(1, { message: "Content is required" })
    .max(10000, { message: "Content cannot exceed 10,000 characters" }), // Huge text input for content
});

export default postSchema;
