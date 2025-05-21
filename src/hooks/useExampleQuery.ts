import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

// Define a Zod schema for the expected API response (array of posts)
const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});
const PostsResponseSchema = z.array(PostSchema);

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  // Validate data with Zod
  const validatedData = PostsResponseSchema.parse(data);
  return validatedData;
};

export function useExamplePostsQuery() {
  return useQuery<Post[], Error>({
    // Explicitly type queryFn return and error
    queryKey: ["examplePosts"],
    queryFn: fetchPosts,
    // Options like staleTime, gcTime can be set here or globally
  });
}
