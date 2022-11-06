import { useState } from "react";
import axios from "axios";

export default function AuthUser() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (token) => {
    localStorage.setItem("token", JSON.stringify(token));

    setToken(token);
  };

  const baseurl = axios.create({
    baseURL: "https://api.staging.batchlearn.com/api/v1/",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    setToken: saveToken,
    token,
    getToken,
    baseurl,
  };
}
