import React from "react";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import CallToAction from "../component/CallToAction";
import PostCard from "../component/PostCard";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPost] = useState(null);

  useEffect(() => {
    const fetchRecentPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getpost?limit=12`);
        const data = await res.json();
        if (res.ok) {
          setPost(data.posts);
        }
        setLoading(false);
      } catch (error) {
        throw new Error(data.message);
      }
    };

    fetchRecentPost();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main>
      <section>
        <div>
          <CallToAction />
        </div>
      </section>
      <section>
        {posts && posts.length > 0 && (
          <>
            <div className="flex flex-col justify-center items-center mb-5">
              <h1 className="text-xl mt-5">Recent Post</h1>
            </div>
            <div className="flex flex-wrap gap-5 mt-5 justify-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
};
export default Home;
