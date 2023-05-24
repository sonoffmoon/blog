import { makeAutoObservable } from "mobx";
import axios from "axios";
import { API_URL } from "../http";
import AuthService from "../services/AuthService";

export default class Store {
  user = {};
  isAuth = false;
  isLoading = false;
  isEditing = false;
  editingId = undefined;
  postContent = {};

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      if (!err.response) {
        return { error: "Server is not responding" };
      }
      return { error: err.response.data };
    }
  }

  async registration(email, password, repeatPassword) {
    try {
      const response = await AuthService.registration(
        email,
        password,
        repeatPassword
      );
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response;
    } catch (err) {
      return { error: err.response.data };
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
    } catch (err) {
      return { error: err.response.data };
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });

      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (err) {
      console.log(err.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
