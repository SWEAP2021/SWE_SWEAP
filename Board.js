import React from "react";
import "../css/Board.css";
import { IoIosArrowBack } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { HiSearch } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";

const article = [
  { title: "1", content: "11111", like: "0" },
  { title: "2", content: "22222", like: "2" },
  { title: "3", content: "33333", like: "4" },
  { title: "4", content: "44444", like: "0" },
  { title: "5", content: "55555", like: "1" },
];

const showArticle = article.map((atc) => {
  return (
    <div className="article">
      <div className="title">{atc.title}</div>
      <div className="content">
        {atc.content}{" "}
        <div style={{ fontSize: "15px" }}>
          <AiFillLike size="15" />
          {atc.like}
        </div>
      </div>
    </div>
  );
});

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: [
        { title: "1", content: "11111", like: "0" },
        { title: "2", content: "22222", like: "2" },
        { title: "3", content: "33333", like: "4" },
        { title: "4", content: "44444", like: "0" },
        { title: "5", content: "55555", like: "1" },
      ],
    };
  }

  getArticle() {
    const post = {
      query:
        "SELECT (Title, Content, LikeCnt) FROM BOARD ORDER BY DayTime DESC;",
    };
    fetch("http://18.118.194.10:8080/SQL", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          title: json.Title,
          content: json.Content,
          like: json.LikeCnt,
        });
      });
  }

  render() {
    return (
      <>
        <button onClick={this.getArticle}>getarticle</button>
        <div className="Board">
          <NavLink to="/">
            <IoIosArrowBack size="40" />
          </NavLink>
          게시판
          <HiSearch size="25" style={{ marginTop: "10px" }} />
        </div>
        {showArticle}
        <div style={{ textAlign: "center" }}>
          <NavLink className="WriteButton" to="/write">
            글 쓰기
          </NavLink>
        </div>
      </>
    );
  }
}

export default Board;
