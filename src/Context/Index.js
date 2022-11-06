import axios from "axios";
import React, { useState } from "react";
export const GlobalContext = React.createContext();

export default function GlobalProvider() {
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
      "Content-Type": "application/json",
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
