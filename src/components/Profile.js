import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Context } from "..";
import UserService from "../services/UserService";
import { ColorRing } from "react-loader-spinner";
import PostService from "../services/PostService";
import PostPreview from "./PostPreview";
import "../styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      const { id } = params;
      const { data: user } = await UserService.getUser(id);
      const posts = await PostService.getAllPosts(user.email);
      setUser(user);
      setPosts(posts);
      setIsLoading(false);
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
  }

  return (
    <main className="main">
      <div className="user-info">
        <h1>Profile</h1>
        <p className="profile-email">{user.email}</p>
      </div>
      <section className="posts">
        {posts.map((post) => {
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
      </section>
    </main>
  );
};

export default Profile;
