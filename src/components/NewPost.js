import Editor from "./editor/Editor";
import Button from "./Button";

import { generateJSON } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Underline } from "@tiptap/extension-underline";

const NewPost = () => {
  const createPost = async () => {
    const html = document.querySelector(".ProseMirror").innerHTML;
    const regex = /<h2>(.*?)<\/h2>/;
    const topic = regex.exec(html)[1];
    const dataObj = generateJSON(html, [StarterKit, Image, Link, Underline]);

    dataObj.topic = topic;
    await fetch("https://sunoffmoon-blog.fly.dev/api/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
      body: JSON.stringify(dataObj),
    });
  };

  return (
    <main className="main">
      <Editor />
      <Button
        type="button"
        onClick={() => createPost()}
        caption={"create post"}
      />
    </main>
  );
};

export default NewPost;
