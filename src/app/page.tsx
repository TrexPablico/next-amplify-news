"use client";

import { useEffect, useState } from "react";
import { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { ApiKey } from "aws-cdk-lib/aws-apigateway";
import Hero from "../components/Hero";
import Image from "next/image";

Amplify.configure(outputs);

const client = generateClient<Schema>({ authMode: "apiKey" });

export default function Home() {
  const [posts, setPost] = useState<Array<Schema["Post"]["type"]>>([]);

  function listTodos() {
    client.models.Post.observeQuery().subscribe({
      next: (data) => {
        console.log("Received data:", data.items); // Add this line to check the data
        setPost([...data.items]);
      },
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between p-6 w-3/4 m-auto">
        <Hero />
        <h1 className="text-4xl pb-1">News</h1>
        <div className="news-card flex flex-wrap justify-center">
          {posts.map((todo) => (
            <div
              key={todo.title}
              className="news-item bg-white rounded-lg shadow-md p-4 mb-4 w-1/3 m-2"
            >
              <Image
                src={todo.imageUrl || "/img/sample.jpg"} // Use the image URL from the post
                alt={todo.title}
                width={300}
                height={200}
              />
              <h3 className="news-title text-xl font-bold mb-2 text-gray-800">
                {todo.title}
              </h3>
              <p className="news-description text-gray-600">
                {todo.description}
              </p>
              <p className="news-date text-gray-500">
                {new Date(todo.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
      <h1></h1>
    </>
  );
}
