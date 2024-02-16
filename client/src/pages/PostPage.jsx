import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Spinner, Button } from "flowbite-react";
import CallToAction from "../component/CallToAction";
import Comment from "../component/Comment";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getpost?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data.posts[0]);
        setError(false);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <section>
        <h1 className=" text-2xl mt-8 p-3 font-roboto max-w-2xl mx-auto">
          {post && post.title}
        </h1>
        <Link
          className="flex justify-center mt-5"
          to={`./search?category=${post && post.category}`}
        >
          <Button className="" color="gray" pill size="xs">
            {post && post.category}
          </Button>
        </Link>
        <img
          src={post && post.image}
          alt={post && post.image}
          className="p-3 max-h-[500px] w-full object-cover"
        />
        <div className="flex justify-between p-3 border-b border-slate-500">
          <span>{new Date(post && post.updatedAt).toLocaleDateString()}</span>
          <span>
            {post && (post.content.length / 1000).toFixed([0])} mins read
          </span>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: post && post.content }}
          className="post-content"
        />
      </section>
      <section>
      <div className="max-x4xl  mx-auto w-full">
        <CallToAction />
      </div>
      </section>
      <section>
        <Comment />
      </section>
    </main>
  );
};

export default PostPage;
