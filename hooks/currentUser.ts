"use client";
import axios from "axios";
const CurrentUser = async () => {
  const tokenid = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${tokenid}`,
  };
  await axios
    .post("http://localhost:8000/auth/User", {}, { headers })
    .then((response) => {
      if (response.data.status === "success") {
        return response.data.user;
      } else {
        return null;
      }
    });
};

export default CurrentUser;
