import api from "../http/http";

export default class UserService {
  static fetchUsers() {
    return api.get("/users");
  }

  static getUser(id) {
    return api.get(`/users/${id}`);
  }

  static getUserByEmail(email) {
    console.log(email);
    return api.post(`/users/`, { email: email });
  }
}
