import axios from "axios";
//for local import we use { } but for package import we don't use { }
const instance = axios.create({
  baseURL:
    import.meta.env.MODE == "development"
      ? "http://localhost:3000/api"
      : "/api",
  withCredentials: true, //to send cookies with requests
});
export default instance;
