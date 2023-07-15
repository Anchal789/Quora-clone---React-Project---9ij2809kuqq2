import React, { useContext, useEffect, useState } from "react";
import "./Feed.css";
import QueryBox from "../QueryBox/Querybox";
import Post from "../Posts/Posts";
import questions from "../../assets/Api";
import { set, get, child, ref, getDatabase, onValue } from "firebase/database";
import { app } from "../../assets/firebase";
import { MyContext } from "../../context/Mycontext";
import axios from "axios";

const Feed = (state) => {
  const mycontext = useContext(MyContext);
  const database = getDatabase(app);
  const [questionList, setQuestionList] = useState([]);

  get(
    child(
      ref(database),
      `questionDatabase/questions/${mycontext.questionDatabase}`
    )
  ).then((snapShot) => {
    setQuestionList(snapShot.val());
  });

  // console.log(questionList);
  // useEffect(() => {
  //   onValue(
  //     ref(database, `questionDatabase/questions/${mycontext.questionDatabase}`),
  //     (snapshot) => {
  //       setQuestionList(snapshot.val());
  //       console.log(snapshot.val())
  //     }
  //   );
  // }, []);

  // const putData = ()=>{
  //   set(ref(database, "questionDatabase"),{
  //     questions
  //   })
  //   console.log("successfull")
  // }
  // putData()

  const date = new Date();
  return (
    <div className="feed">
      <QueryBox />

      {questionList.map((question, index) => (
        <Post key={index} id={question.id} question={question.question} answers={question.answers || question.answer}/>

        // <li key={index}>
        //   <p>{question.question}</p>
        // </li>
      ))}
    </div>
  );
};

export default Feed;
