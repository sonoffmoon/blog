import { useContext } from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Underline } from "@tiptap/extension-underline";
import { generateHTML } from "@tiptap/react";
import { Context } from "../..";

import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineStrikethrough,
  AiOutlineCode,
  AiOutlineOrderedList,
  AiOutlineEnter,
  AiOutlineUnderline,
} from "react-icons/ai";
import { BsParagraph, BsBlockquoteLeft } from "react-icons/bs";
import { RxHeading } from "react-icons/rx";
import { RiFormatClear } from "react-icons/ri";

import "../../styles/Editor.css";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt("URL");

    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  return (
    <section className="editor-menu">
      <button title="Add image" className="editor-control" onClick={addImage}>
        <ion-icon name="image-outline"></ion-icon>
      </button>
      <button
        title="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "is-active editor-control"
            : "editor-control"
        }
      >
        <AiOutlineBold className="btn-icon" />
      </button>
      <button
        title="Underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={
          editor.isActive("underline")
            ? "is-active editor-control"
            : "editor-control"
        }
      >
        <AiOutlineUnderline className="btn-icon" />
      </button>
      <button
        title="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "is-active editor-control"
            : "editor-control"
        }
      >
        <AiOutlineItalic className="btn-icon" />
      </button>
      <button
        title="Strike"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike")
            ? "is-active editor-control"
            : "editor-control"
        }
      >
        <AiOutlineStrikethrough className="btn-icon" />
      </button>
      <button
        title="Code"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={
          editor.isActive("code")
            ? "is-active editor-control"
            : "editor-control"
        }
      >
        <AiOutlineCode className="btn-icon" />
      </button>
      <button
        title="Paragraph"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={
          editor.isActive("paragraph")
            ? "is-active editor-control"
            : "editor-control"
        }
      >
        <BsParagraph className="btn-icon" />
      </button>
      <button
        title="Heading"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "is-active btn-heading editor-control"
            : "btn-heading editor-control"
        }
      >
        <RxHeading className="btn-icon" />
      </button>
      <button
        title="Subheading"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? "is-active  btn-heading editor-control"
            : "btn-heading editor-control"
        }
      >
        <RxHeading className="btn-icon" />2
      </button>
      <button
        title="Subheading"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive("heading", { level: 4 })
            ? "is-active  btn-heading editor-control"
            : "btn-heading editor-control"
        }
      >
        <RxHeading className="btn-icon" />3
      </button>
      <button
        title="Add link"
        onClick={addLink}
        className={"link editor-control"}
      >
        <ion-icon name="link-outline"></ion-icon>
      </button>

      <button
        title="Unordered list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "is-active editor-control"
            : "editor-control"
        }
      >
        <ion-icon name="list-outline"></ion-icon>
      </button>
      <button
        title="Ordered list"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "is-active editor-control"
            : "editor-control"
        }
      >
        <AiOutlineOrderedList className="btn-icon" />
      </button>
      <button
        title="Code block"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editor.isActive("codeBlock")
            ? "is-active editor-control"
            : "editor-control"
        }
      >
        <ion-icon name="code-slash-outline"></ion-icon>
      </button>
      <button
        title="Quote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockquote")
            ? "is-active editor-control"
            : "editor-control"
        }
      >
        <BsBlockquoteLeft className="btn-icon" />
      </button>
      <button
        title="Hard break"
        className="editor-control"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <AiOutlineEnter className="btn-icon" />
      </button>
      <button
        className="editor-control"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        <RiFormatClear className="btn-icon" />
      </button>
      <button
        title="Undo"
        className="editor-control"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <ion-icon name="arrow-undo-outline"></ion-icon>
      </button>
      <button
        title="Redo"
        className="editor-control"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <ion-icon name="arrow-redo-outline"></ion-icon>
      </button>
    </section>
  );
};

export default ({ content }) => {
  const { store } = useContext(Context);
  const editor = useEditor({
    extensions: [StarterKit, Image, Link, Underline],
    content: store.isEditing
      ? `<h2>${generateHTML(store.postTopic, [StarterKit])}</h2>
        ${generateHTML(store.postContent, [
          StarterKit,
          Image,
          Link,
          Underline,
        ])}`
      : `
    <h2>
    Hi there,
    </h2>
    <p>
    this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
        <ul>
          <li>
            That’s a bullet list with one …
          </li>
          <li>
            … or two list items.
          </li>
        </ul>
        <p>
          Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
        </p>
        <pre><code class="language-css">body {
    display: none;
  }</code></pre>
        <p>
          I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
        </p>
        <blockquote>
          Wow, that’s amazing. Good work, boy! 👏
          <br />
          — Mom
        </blockquote>
      `,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};
