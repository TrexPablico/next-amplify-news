"use client";

import { useEffect, useState } from "react";
import { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import Hero from "../components/Hero";
import Image from "next/image";
import Contact from "@/components/contact";
import Footer from "@/components/Footer";

Amplify.configure(outputs);

const client = generateClient<Schema>({ authMode: "apiKey" });

export default function Home() {
  const [posts, setPost] = useState<Array<Schema["Post"]["type"]>>([]);
  const [visibleCount, setVisibleCount] = useState(3); // Number of items to display initially

  function listTodos() {
    client.models.Post.observeQuery().subscribe({
      next: (data) => {
        console.log("Received data:", data.items);
        setPost([...data.items]);
      },
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); // Increment by 3
  };

  const handleCardClick = (id: string) => {
    // navigate(`/resource/${id}`);
    console.log(`Card clicked: ${id}`);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between p-6 w-3/4 m-auto">
        <Hero />
        <div className="news-card grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:mt-[-1px] mt-[-600px]">
          {posts.slice(0, visibleCount).map((todo) => (
            <div
              key={todo.title}
              className="news-item bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer"
              onClick={() => handleCardClick(todo.id)}
            >
              <Image
                src="/img/sample.jpg" // Use the default image path
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
        {visibleCount < posts.length && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
      <Contact />
      <Footer />
    </>
  );
}
