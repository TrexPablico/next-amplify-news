"use client";

import { useEffect, useState } from "react";
import { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { ApiKey } from "aws-cdk-lib/aws-apigateway";
import Hero from "../components/Hero";

Amplify.configure(outputs);

const client = generateClient<Schema>({ authMode: "apiKey" });

export default function Home() {
  const [posts, setPost] = useState<Array<Schema["Post"]["type"]>>([]);

  function listTodos() {
    client.models.Post.observeQuery().subscribe({
      next: (data) => setPost([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between p-6 w-1/2 m-auto">
        <Hero />
        <h1 className="text-4xl pb-1">News</h1>
        {posts.map((todo) => (
          <div key={todo.title}>
            <li>{todo.title}</li>
            <li>{todo.description}</li>
          </div>
        ))}
      </div>
      <h1></h1>
    </>
  );
}
