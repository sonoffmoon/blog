import api from "../http/http";

export default class AuthService {
  static async login(email, password) {
    return api.post("/login", { email, password });
  }

  static async registration(email, password, repeatPassword) {
    return api.post("/registration", { email, password, repeatPassword });
  }

  static async logout() {
    return api.post("/logout");
  }
}
