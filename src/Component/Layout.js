import axios from "axios";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import GlobalProvider from "../Context/Index";
import Nav from "./Nav/Nav";
import Sidemenu from "./Nav/Sidemenu";

const Layout = () => {
  const { baseurl } = GlobalProvider();

  useEffect(() => {
    baseurl
      .get("auth/profile_info/")
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Nav />
      <Sidemenu />
      <Outlet />
    </>
  );
};

export default Layout;
