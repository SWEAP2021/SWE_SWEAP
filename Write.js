import React from "react";
import "../css/Write.css";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";

class Write extends Component {
  render() {
    return (
      <>
        <div className="Write">
          <NavLink to="/board">
            <IoIosArrowBack size="40" />
          </NavLink>
          게시글 작성
        </div>
        <input className="write_title" placeholder="Title" name="title" />
        <input
          className="write_content"
          placeholder="Fill the content."
          name="title"
        />
        <br />
        <div style={{ textAlign: "center" }}>
          <NavLink className="WriteButton" to="/board">
            완료
          </NavLink>
        </div>
      </>
    );
  }
}

export default Write;
