import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { MyContext } from "../../context/Mycontext";
import Logout from "../LogoutPage/Logout";
import Sidebar from "../Sidebar/Sidebar";
import Feed from "../Feed/Feed";
import Widgets from "../Widgets/Widgets";
import "./Home.css";
import { useNavigate } from "react-router";
import axios from "axios";


const Home = () => {
  const mycontext = useContext(MyContext);
  const navigate = useNavigate();
  
  return (
    <div className="quora">
      <Navbar />
      <div className="quora_content">
        <Sidebar />
        <Feed/>
        <Widgets />
      </div>
    </div>
  );
};

export default Home;
