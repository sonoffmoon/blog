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
    let html = document.querySelector(".ProseMirror").innerHTML;
    const regex = /<h2>(.*?)<\/h2>/;
    let topic = regex.exec(html)[1];
    html = html.replace(/<h2>[^<]*<\/h2>/, "");

    const dataObj = generateJSON(html, [StarterKit, Image, Link, Underline]);

    topic = generateJSON(topic, [StarterKit]);

    const author = store.user.email;
    const authorId = store.user.id;

    if (isEditing) {
      const editedPost = await PostService.editPost(
        store.editingId,
        JSON.stringify(topic),
        author,
        authorId,
        JSON.stringify(dataObj)
      );

      if (editedPost) {
        navigate("/");
      }
    } else {
      await PostService.newPost(
        JSON.stringify(topic),
        author,
        authorId,
        JSON.stringify(dataObj)
      );
      navigate("/");
    }
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
