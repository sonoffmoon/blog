import axios from "axios";
import { API_URL } from "../http";
import api from "../http";

export default class PostService {
  static async getAllPosts() {
    const posts = await axios.get(`${API_URL}/posts`);
    return posts.data;
  }

  static async getPost(postId) {
    const post = await axios.get(`${API_URL}/posts/${postId}`);
    return post.data;
  }

  static async newPost(topic, author, dataObj) {
    console.log(dataObj);
    const post = await api.post(`${API_URL}/posts/new`, {
      author: author,
      topic: topic,
      content: dataObj,
    });
  }

  static async editPost(postId, topic, author, content) {
    console.log({ topic, author, content });
    api.put(`${API_URL}/posts/${postId}`, { topic, author, content });
  }
}
