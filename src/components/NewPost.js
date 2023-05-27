import { useContext } from "react";
import { useNavigate } from "react-router";
import { Context } from "..";

import PostService from "../services/PostService";
import Editor from "./editor/Editor";
import Button from "./Button";

import { generateJSON } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Underline } from "@tiptap/extension-underline";

const NewPost = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const createPost = async (isEditing) => {
    const html = document.querySelector(".ProseMirror").innerHTML;
    const regex = /<h2>(.*?)<\/h2>/;
    const topic = regex.exec(html)[1];
    const dataObj = generateJSON(html, [StarterKit, Image, Link, Underline]);

    dataObj.topic = topic;
    const author = store.user.email;
    if (isEditing) {
      await PostService.editPost(
        store.editingId,
        topic,
        author,
        JSON.stringify(dataObj)
      );
    } else {
      await PostService.newPost(topic, author, JSON.stringify(dataObj));
    }

    navigate("/");
  };

  return (
    <main className="main">
      <Editor content={store.postContent} />
      <Button
        type="button"
        onClick={() => createPost(store.isEditing)}
        caption={"create post"}
      />
    </main>
  );
};

export default NewPost;
