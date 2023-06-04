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
// import Popup from "./Popup";
import { Context } from "..";

const Post = () => {
  const { store } = useContext(Context);
  const params = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setLoading] = useState(true);
  // const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data = await PostService.getPost(params.id);
      setLoading(false);
      setPost(data);
    };
    getData();
  }, []);

  const editPost = (post) => {
    store.postTopic = JSON.parse(post.topic);
    store.postContent = JSON.parse(post.content);
    store.isEditing = true;
    store.editingId = params.id;

    navigate("/new");
  };

  const deletePost = async () => {
    const { id } = params;
    const result = await PostService.deletePost(id);

    if (result.status == 200) {
      navigate("/");
    }
  };

  const formatDate = () => {
    const date =
      post.createdAt.substring(8, 10) +
      "/" +
      post.createdAt.substring(5, 7) +
      "/" +
      post.createdAt.substring(0, 4);

    return date;
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
            <div className="post-controls">
              <Button
                classname={"edit"}
                type={"button"}
                onClick={() => editPost(post)}
                caption={"Edit post"}
              />
              <Button
                classname={"edit"}
                type={"button"}
                onClick={deletePost}
                caption={"Delete post"}
              />
            </div>
          ) : (
            ""
          )}
          <div className="header-wrapper">
            <h2 className="post-heading">
              {parse(generateHTML(JSON.parse(post.topic), [StarterKit]))}
            </h2>
            <a className="user-link" href={`/users/${post.authorId}`}>
              {post.author}
            </a>
            <time className="post-created-at">{formatDate()}</time>
          </div>
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
