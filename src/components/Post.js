import { useEffect, useState } from "react";

import { useParams } from "react-router";

import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Underline } from "@tiptap/extension-underline";
import { generateHTML } from "@tiptap/react";

import parse from "html-react-parser";

import { ColorRing } from "react-loader-spinner";
import "../styles/Editor.css";

const Post = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const data = await (
        await fetch(`https://sunoffmoon-blog.fly.dev/api/posts/${params.id}`)
      ).json();
      setLoading(false);
      setPost(data);
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
        <section className="post ProseMirror">
          {parse(
            generateHTML(JSON.parse(post.content), [
              StarterKit,
              Image,
              Link,
              Underline,
            ])
          )}
        </section>
      </main>
    );
  }
};

export default Post;
