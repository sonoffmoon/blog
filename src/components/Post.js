import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Underline } from "@tiptap/extension-underline";
import { generateHTML } from "@tiptap/react";

import parse from "html-react-parser";

import { ColorRing } from "react-loader-spinner";
import "../styles/Editor.css";
import PostService from "../services/PostService";
import Button from "./Button";
import { Context } from "..";

const Post = () => {
  const { store } = useContext(Context);
  const params = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data = await PostService.getPost(params.id);
      setLoading(false);
      setPost(data);
    };
    getData();
  }, []);

  const editPost = (postContent) => {
    store.postContent = JSON.parse(postContent);
    store.isEditing = true;
    store.editingId = params.id;
    delete store.postContent.topic;

    navigate("/new");
  };

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
          {store.user.email === post.author ? (
            <Button
              classname={"edit"}
              type={"button"}
              onClick={() => editPost(post.content)}
              caption={"Edit post"}
            />
          ) : (
            ""
          )}
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
