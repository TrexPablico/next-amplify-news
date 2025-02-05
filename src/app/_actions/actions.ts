"use server";

import { cookieBasedClient } from "@/utils/amplify-utils";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const { data } = await cookieBasedClient.models.Post.create({
    title: formData.get("title")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    date: formData.get("date")?.toString() || "",
    image: formData.get("image")?.toString() || "",
  });

  redirect("/");
}
