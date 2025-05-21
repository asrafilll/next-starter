"use client";

import { useExamplePostsQuery } from "@/hooks/useExampleQuery";
import { Button } from "@/components/ui/button";

export default function ReactQueryExamplePage() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useExamplePostsQuery();

  if (isLoading)
    return <p className="container mx-auto p-4">Loading posts...</p>;
  if (isError)
    return (
      <p className="container mx-auto p-4">
        Error fetching posts: {error?.message}
      </p>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">React Query Example Posts</h1>
      <Button onClick={() => refetch()} disabled={isFetching} className="mb-4">
        {isFetching ? "Refreshing..." : "Refresh Posts"}
      </Button>
      {posts && posts.length > 0 ? (
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.id} className="p-2 border rounded">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-700">{post.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
