"use client"; // Add this directive at the top
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import postSchema from "@/schemas/postSchems";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"; // Your custom form components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createPost } from "../_actions/actions";

const AddPost = () => {
  // Define your form
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      imageUrl: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof postSchema>) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("content", data.content);
      if (data.imageUrl) {
        formData.append("imageUrl", data.imageUrl);
      }
      await createPost(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 m-auto w-[600px]"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>Enter the title of the post.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the description of the post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Input placeholder="Content" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the content of the post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Image URL" {...field} />
                </FormControl>
                <FormDescription>Enter the URL of the image.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add Post</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddPost;
