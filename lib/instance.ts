import axios from "axios";
const Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PORT,
});
export default Instance;

const GET = Instance.get;
const POST = Instance.post;
const DELETE = Instance.delete;
const PATCH = Instance.patch;

export { GET, PATCH, POST, DELETE };
