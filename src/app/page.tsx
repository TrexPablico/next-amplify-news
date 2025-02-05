import { cookieBasedClient } from "@/utils/amplify-utils";
import Image from "next/image";

export default async function Home() {
  const { data: posts } = await cookieBasedClient.models.Post.list({
    selectionSet: ["title", "description", "date", "image"],
  });

  console.log("posts", posts);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 w-1/2 m-auto">
      <h1 className="text-4xl pb-10">News</h1>
      {posts?.map(async (post, idx) => (
        <div key={idx}>
          <div>{post.title}</div>
        </div>
      ))}
    </div>
  );
}
