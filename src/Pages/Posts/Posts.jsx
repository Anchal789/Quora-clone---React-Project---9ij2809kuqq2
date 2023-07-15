import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import "./Post.css";
import "./modal.css";
import { Button, Input } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Modal from "react-modal";

import {
  FacebookShareButton,
  EmailShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  WorkplaceShareButton,
} from "react-share";
import {
  FacebookIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon,
  WorkplaceIcon,
} from "react-share";
import CloseIcon from "@mui/icons-material/Close";
import Popup from "reactjs-popup";
import axios from "axios";

const Post = ({ id, question, answers }) => {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState({
    firstName : "",
    lastName : "",
    image : ""
  })
  const date = new Date();

  async function randomUser() {
    const response = await axios.get("https://randomuser.me/api/?nat=in");
    const userData = await response.data;
    console.log(userData.results);
    setUser({
      firstName: userData.results[0].name.first,
      lastName: userData.results[0].name.last,
      userImage: userData.results[0].picture.thumbnail,
    });
  }

  useEffect(() => {
    randomUser();

  }, []);

  //   const [answer, setAnswer] = useState("");
  //   const [answerList, setAnswerList] = useState([]);
  //   const questionId = useSelector(selectQuestionId);
  //   const user = useSelector(selectUser);
  //   const [showAnswer, setShowAnswer] = useState(false);

  //   const questionName = useSelector(selectQuestionName);

  //   const handleAddAnswer = async (e) => {
  //     e.preventDefault();

  //     if (questionId && answer) {
  //       const data = {
  //         questionId: questionId,
  //         timestamp: serverTimestamp(),
  //         answer: answer,
  //         user: user,
  //       };
  //       await setDoc(doc(db, "answer", questionId), data);

  //       setAnswer("");
  //       setOpenModal(false);
  //     }
  //   };

  //   const fetchAnswers = async () => {
  //     try {
  //       const q = await query(
  //         collection(db, "answer"),
  //         orderBy("timestamp", "asc")
  //       );

  //       await onSnapshot(q, (querySnapshot) => {
  //         setAnswerList(
  //           querySnapshot.docs.map((doc) => ({
  //             id: doc.id,
  //             answers: doc.data(),
  //           }))
  //         );
  //       });
  //       console.log(answerList);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   const handleShowAnswers = (e) => {
  //     fetchAnswers();
  //     setShowAnswer(!showAnswer);
  //   };

  //   useEffect(() => {}, [questionId]);

  return (
    <div
      className="post"
      //   onClick={() =>
      //     dispatch(setQuestionInfo({ questionId: Id, questionName: question }))
      //   }
    >
      <div className="post_info">
        <Avatar/>
        {/* {date.toLocaleTimeString()} */}
        <img src={"https://xsgames.co/randomusers/avatar.php?g=male "} alt="" />
        <h4>
          {/* {user.firstName} {user.lastName} */}
        </h4>
        {/* <small>{new Date(timestamp?.toDate()).toLocaleString()}</small> */}
      </div>
      <div className="post_body">
        <div className="post_question">
          <p>{question}</p>
          <Button
            className="post_btnAnswer"
            //    onClick={() => setOpenModal(true)}
          >
            Answer
          </Button>
          <Modal
            isOpen={openModal}
            ariaHideApp={false}
            onRequestClose={() => setOpenModal(false)}
            shouldCloseOnOverlayClick={false}
          >
            <div className="modal__question">
              <h1>{}</h1>
              <p>
                asked by <span className="name">{}</span> {""}
                on{" "}
                <span className="name">
                  {/* {new Date(timestamp?.toDate()).toLocaleString()} */}
                </span>
              </p>
            </div>
            <div className="modal__answer">
              <textarea
                // value={answer}
                required
                // onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter Your Answer Here"
                type="text"
              />
            </div>
            <div className="modal__button">
              <button className="cancle" onClick={() => setOpenModal(false)}>
                Cancel
              </button>
              <button
                type="sumbit"
                //    onClick={handleAddAnswer}
                className="add"
              >
                Add Answer
              </button>
            </div>
          </Modal>
        </div>

        {/* {showAnswer && (
          <div className="post__answer">
            {answerList.map(({ id, answers }) => (
              <p
                key={id}
                style={{ position: "relative", paddingBottom: "5px" }}
              >
                {Id === answers.questionId ? (
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p style={{ padding: "0 0 10px 0" }}>{answers.answer}</p>
                    <p
                      style={{
                        position: "absolute",
                        color: "gray",
                        fontSize: "small",
                        display: "flex",
                        right: "10px",
                        bottom: "0",
                      }}
                    >
                      <span style={{ color: "#b92b27" }}>
                        {answers.user.displayName
                          ? answers.user.displayName
                          : answers.user.email}{" "}
                        on{" "}
                        {new Date(answers.timestamp?.toDate()).toLocaleString()}
                      </span>
                    </p>
                  </span>
                ) : (
                  ""
                )}
              </p>
            ))}
          </div>
        )}
        {image && <img src={image} alt="post" />} */}
      </div>
      <div className="post_footer">
        <div className="post_footerActions">
          <div className="post_footerAction">
            <div className="upvote">
              <ThumbUpOutlinedIcon />
              <small>Upvote. {123}</small>
            </div>
            <div className="downvote">
              <ThumbDownOutlinedIcon />
            </div>
          </div>
          <div className="comment">
            <ChatBubbleOutlineOutlinedIcon />
            <small>145</small>
          </div>
          <div className="share">
            <LoopOutlinedIcon />
            {/* <small>69</small> */}
            <span className="footerText">
              <Popup
                trigger={<button className="sharePopup"> Share </button>}
                modal
                nested
              >
                {(close) => (
                  <div className="modal">
                    <div className="closeBtn">
                      <button className="clsBtn" onClick={() => close()}>
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="content">Share ChitChat with friends</div>
                    <div className="options">
                      <FacebookShareButton
                        url={
                          "https://quora-clone-sanju-manna-2201.netlify.app/"
                        }
                      >
                        <FacebookIcon
                          logoFillColor="white"
                          round={true}
                          size={50}
                        ></FacebookIcon>
                      </FacebookShareButton>
                      <WhatsappShareButton
                        url={
                          "https://quora-clone-sanju-manna-2201.netlify.app/"
                        }
                      >
                        <WhatsappIcon
                          logoFillColor="white"
                          round={true}
                          size={50}
                        ></WhatsappIcon>
                      </WhatsappShareButton>
                      <TelegramShareButton
                        url={
                          "https://quora-clone-sanju-manna-2201.netlify.app/"
                        }
                      >
                        <TelegramIcon
                          logoFillColor="white"
                          round={true}
                          size={50}
                        ></TelegramIcon>
                      </TelegramShareButton>
                      <WorkplaceShareButton
                        url={
                          "https://quora-clone-sanju-manna-2201.netlify.app/"
                        }
                      >
                        <WorkplaceIcon
                          logoFillColor="white"
                          round={true}
                          size={50}
                        ></WorkplaceIcon>
                      </WorkplaceShareButton>
                      <EmailShareButton
                        url={
                          "https://quora-clone-sanju-manna-2201.netlify.app/"
                        }
                      >
                        <EmailIcon
                          logoFillColor="white"
                          round={true}
                          size={50}
                        ></EmailIcon>
                      </EmailShareButton>
                    </div>
                  </div>
                )}
              </Popup>
            </span>
          </div>
        </div>
        <div className="post_more">
          <MoreHorizOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Post;
