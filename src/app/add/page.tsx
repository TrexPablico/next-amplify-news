"use client"; // Add this directive at the top

import React, { useEffect, useState } from "react";
import { createPost } from "../_actions/actions";

const AddPost = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Get the current date and time
    const now = new Date();
    // Format the date to YYYY-MM-DD (required for input type="date")
    const formattedDate = now.toISOString().split("T")[0];
    // Set the current date in the state
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div>
      <form
        action={createPost}
        className="p-4 flex flex-col items-center gap-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border border-gray-300 p-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="border border-gray-300 p-2"
        />
        <input
          type="date"
          name="date"
          value={currentDate}
          readOnly
          className="border border-gray-300 p-2"
        />
        <input
          type="text"
          name="image"
          placeholder="Image"
          className="border border-gray-300 p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
