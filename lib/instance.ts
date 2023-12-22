import axios from "axios";

const Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PORT,
});

const GET = Instance.get.bind(Instance);
const POST = Instance.post.bind(Instance);
const DELETE = Instance.delete.bind(Instance);
const PATCH = Instance.patch.bind(Instance);

export { GET, PATCH, POST, DELETE };
export default Instance;
