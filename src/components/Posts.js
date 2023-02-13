import { useState, useEffect } from "react";

import { ColorRing } from "react-loader-spinner";

import { Link } from "react-router-dom";

import "../styles/Posts.css";
import "../styles/Post-preview.css";

const PostPreview = ({ createdAt, id, topic, content }) => {
  const date =
    createdAt.substring(8, 10) +
    "/" +
    createdAt.substring(5, 7) +
    "/" +
    createdAt.substring(0, 4);
  return (
    <Link to={`/posts/${id}`} content={content}>
      <article class="post-preview">
        <h3>{topic}</h3>
        <p>{date}</p>
      </article>
    </Link>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log("fetch");
    const getData = async () => {
      const data = await (
        await fetch("https://sunoffmoon-blog.fly.dev/api/posts/")
      ).json();
      setLoading(false);
      setPosts(data);
    };
    getData();
  }, []);

  if (isLoading) {
    return (
      <main className="main">
        <div className="loadingContainer">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      </main>
    );
  } else {
    return (
      <main className="main">
        <section className="posts">
          {posts.map((post) => {
            // console.log(post);
            return (
              <PostPreview
                id={post._id}
                topic={post.topic}
                content={post.content}
                createdAt={post.createdAt}
              />
            );
          })}
        </section>
      </main>
    );
  }
};

export default Posts;
