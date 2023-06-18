import axios from "axios";
import { API_URL } from "../http/http";
import api from "../http/http";

export default class PostService {
  static async getAllPosts(author, page) {
    const url = author
      ? `${API_URL}/posts?author=${author}&page=${page}`
      : `${API_URL}/posts?page=${page}`;

    const posts = await axios.get(url);
    return posts.data;
  }

  static async getPost(postId) {
    const post = await axios.get(`${API_URL}/posts/${postId}`);
    return post.data;
  }

  static async newPost(topic, author, authorId, dataObj) {
    const post = await api.post(`${API_URL}/posts/new`, {
      author: author,
      authorId: authorId,
      topic: topic,
      content: dataObj,
    });
  }

  static async editPost(postId, topic, author, authorId, content) {
    const post = api.put(`${API_URL}/posts/${postId}`, {
      topic,
      author,
      authorId,
      content,
    });
    return post;
  }

  static async deletePost(postId) {
    try {
      const result = api.delete(`${API_URL}/posts/${postId}`, { id: postId });
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}
