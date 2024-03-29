import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Spinner, Button } from "flowbite-react";
import CallToAction from "../component/CallToAction";
import Comment from "../component/Comment";
import PostCard from "../component/PostCard";
import SEO from "../metaSeo";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPost, setRecentPost] = useState(null);

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

  useEffect(() => {
    const fetchRecentPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getpost?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPost(data.posts);
        }
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
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
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <SEO
        title={post && post.title.slice(0, 58)}
        description={post && post.title.slice(0, 156)}
        name="Global treadings"
        type="Website"
        imageUrl={post && post.image}
        url={window.location.href}
      />

      <section>
        <h1 className=" text-2xl mt-8 p-3 font-roboto max-w-2xl mx-auto">
          {post && post.title}
        </h1>
        <Link
          className="flex justify-center mt-5"
          to={`./search?category=${post && post.category}`}
        >
          <Button className="" color="gray" pill size="xs">
            {post && post.category.toUpperCase()}
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
        <div className="max-x4xl  mx-auto w-full p-5 border-b  border-t border-slate-500">
          <CallToAction />
        </div>
      </section>
      <section className="p-5 border-b border-slate-500">
        <Comment postId={post && post._id} />
      </section>
      <section>
        <div className="flex flex-col justify-center items-center mb-5">
          <h1 className="text-xl mt-5">Recent Post</h1>
        </div>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPost &&
            recentPost.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </section>
    </main>
  );
};

export default PostPage;
