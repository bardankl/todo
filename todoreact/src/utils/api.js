import axios from "axios";
const mode = "dev";
const URL = mode === "dev" ? "http://localhost" : "https://production.com";
const PORT = 3000;
const baseURL = `${URL}:${PORT}`;

export default axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});
