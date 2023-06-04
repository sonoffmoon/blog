import { Link } from "react-router-dom";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

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
      <article className="post-preview">
        <h3>
          {generateHTML(JSON.parse(topic), [StarterKit]).replace(
            /<\/?[^>]+(>|$)/g,
            ""
          )}
        </h3>
        <p>{date}</p>
      </article>
    </Link>
  );
};

export default PostPreview;
