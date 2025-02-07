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
    .max(100, { message: "Description cannot exceed 500 characters" }), // Example of adding a max length
  content: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description cannot exceed 500 characters" }), //
});

export default postSchema;
