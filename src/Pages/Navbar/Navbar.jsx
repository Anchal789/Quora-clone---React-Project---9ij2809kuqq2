import React, { useContext, useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Avatar, Button, Input } from "@mui/material";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import Modal from "react-modal";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { MyContext } from "../../context/Mycontext";
import "./Navbar.css";
import Logout from "../LogoutPage/Logout";
import { useNavigate } from "react-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../../assets/firebase";

const Navbar = () => {
  const mycontext = useContext(MyContext);
  const loginCred = JSON.parse(localStorage.getItem("loginCred"));
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    setOpenModal(false);
  };

  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("loginCred",JSON.stringify({email : user.email, name : user.displayName, image : user.photoURL}))
        // mycontext.unpdateContext("name", `${user.displayName}`);
        // mycontext.unpdateContext("email", `${user.email}`);
        // mycontext.unpdateContext("image", `${user.photoURL}`);
        console.error("User Exist", user.email);
      } else {
        setUser(null);
        console.error("no user found");
        
      }
    });
    if (user === null) {
      navigate("/login");
      console.error("no user found");
      signOut(auth);
      
    } else {
      null;
    }
  }, []);

  return (
    <div className="navbar">
      <div className="navbar_logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/768px-Quora_logo_2015.svg.png?20170609154433"
          alt="logo"
        />
      </div>
      <div className="navbar_icons">
        <div className="navbar_icon">
          <HomeIcon />
        </div>
        <div className="navbar_icon">
          <FeaturedPlayListOutlinedIcon />
        </div>
        <div className="navbar_icon">
          <AssignmentTurnedInOutlinedIcon />
        </div>
        <div className="navbar_icon">
          <PeopleAltOutlinedIcon />
        </div>
        <div className="navbar_icon">
          <NotificationsNoneOutlinedIcon />
        </div>
      </div>
      <div className="navbar_input">
        <SearchOutlinedIcon />
        <input id="navbar-input" type={"text"} placeholder="Search Quora" />
      </div>
      <div className="navbar_right">
        <div className="navbar_avatar">
          <Avatar src={loginCred.image} />
        </div>
        <span
          id="logoutDiv"
          style={{ display: "inline", width: "100px", textAlign: "center" }}
          onClick={() => {
            signOut(auth);
            navigate("/login");
          }}
        >
          <LogoutIcon />
        </span>
        <LanguageOutlinedIcon />
        <Button onClick={() => setOpenModal(true)}>Add Question</Button>
        <Modal
          isOpen={openModal}
          ariaHideApp={false}
          onRequestClose={() => setOpenModal(false)}
          shouldCloseOnOverlayClick={false}
        >
          <div className="modal_title">
            <div className="headings">
              <h5>Add Question</h5>
              <h5>Share Link</h5>
            </div>
            <div className="modal_info">
              <Avatar className="avatar" src={loginCred.image} />
              <p>{loginCred.name ? loginCred.name : loginCred.email} asked</p>
              <div className="modal_scope">
                <PeopleAltOutlinedIcon />
                <p>public</p>
                <ExpandMoreOutlinedIcon />
              </div>
            </div>
            <div className="modal_field">
              <Input
                type="text"
                value={input}
                required
                onChange={(e) => setInput(e.target.value)}
                placeholder="Start your question with 'what', 'How', 'Why' etc."
              />

              <div className="modal_fieldLink">
                <LinkOutlinedIcon />
                <Input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Optional: include a link that give context"
                />
              </div>
            </div>
            <div className="modal_buttons">
              <button className="cancle" onClick={() => setOpenModal(false)}>
                Close
              </button>
              <button type="submit" className="add" onClick={handleAddQuestion}>
                Add Question
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
