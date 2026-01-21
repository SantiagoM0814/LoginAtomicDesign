import axios from "axios";

const PATH_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const http = axios.create({
  baseURL: PATH_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});
