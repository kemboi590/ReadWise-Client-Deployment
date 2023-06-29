import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./../../context/userContext/Context";
function Home() {
  const { user } = useContext(Context);
  return (
    <div className="homePage">
      <div className="intro">
        <h1 className="welcome">
          WELCOME TO READWISE <br /> BLOGGING PLATFORM
        </h1>
        <h4 className="subTitle">Learn by Stuying more</h4>
      </div> 
      <Link to="/createblog">
        <h4 className="CreateBlog"> Create Blog </h4>
      </Link>
    </div>
  );
}

export default Home;
