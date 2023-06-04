import { useState, useEffect, useContext } from "react";
import { Context } from "..";
import { ColorRing } from "react-loader-spinner";
import PostService from "../services/PostService";
import PostPreview from "./PostPreview";
import Button from "./Button";

import "../styles/Posts.css";

const Posts = () => {
  const { store } = useContext(Context);
  store.isEditing = false;
  store.editingId = undefined;
  store.postContent = {};
  store.postTopic = {};
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [nextPageExists, setNextPageExists] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await PostService.getAllPosts(null, page);
      setLoading(false);
      setAllPosts((prevPosts) => {
        const uniquePosts = [...prevPosts];
        data.forEach((post) => {
          if (!uniquePosts.some((p) => p._id === post._id)) {
            uniquePosts.push(post);
          }
        });
        return uniquePosts;
      });
    };
    getData();
  }, [page]);

  const nextPage = async () => {
    const nextPageData = await PostService.getAllPosts(null, page + 1);
    if (!nextPageData.length) {
      setNextPageExists(false);
      return;
    }
    setNextPageExists(true);
    setAllPosts((prevPosts) => {
      const uniquePosts = [...prevPosts];
      nextPageData.forEach((post) => {
        if (!uniquePosts.some((p) => p._id === post._id)) {
          uniquePosts.push(post);
        }
      });
      return uniquePosts;
    });
    setPage(page + 1);
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
        <section className="posts">
          {allPosts.map((post) => {
            return (
              <PostPreview
                key={post._id}
                id={post._id}
                topic={post.topic}
                content={post.content}
                createdAt={post.createdAt}
              />
            );
          })}
          {allPosts.length >= 18 ? (
            nextPageExists ? (
              <Button
                className="btn"
                type="button"
                onClick={nextPage}
                caption="Load more"
              />
            ) : (
              <span className="thats-all">That's all!</span>
            )
          ) : (
            ""
          )}
        </section>
      </main>
    );
  }
};

export default Posts;
