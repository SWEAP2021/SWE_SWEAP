import React from "react";
import "../css/Ranking.css";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          id: "1번",
          profit: 0,
        },
        {
          id: "2번",
          profit: 0,
        },
        {
          id: "3번",
          profit: 0,
        },
        {
          id: "4번",
          profit: 0,
        },
        {
          id: "5번",
          profit: 0,
        },
        {
          id: "6번",
          profit: 0,
        },
        {
          id: "7번",
          profit: 0,
        },
      ],
    };
  }

  getRanking = () => {
    const post = {
      query:
        "SELECT UserID, FinalProfit FROM PARTICIPATE ODER BY FinalProfit DESC LIMIT 7",
    };
    fetch("http://18.118.194.10:8080/SQL", {
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        for (let i = 0; i < json.length; ++i) {
          this.setState({
            id: json[i].UserID,
            profit: json[i].ContestProfit,
          });
        }
      });
  };

  render() {
    this.getRanking();
    return (
      <>
        <NavLink to="/">
          <IoIosArrowBack size="40" />
        </NavLink>
        <div className="ranking1">제 1회 모의투자 경진대회 결과</div>
        <div className="ranking">
          <br />
          <br />
          <div className="top1">
            <div className="top3">
              1<div style={{ color: "white" }}>{this.state.list[0].id}</div>
              <div
                style={{
                  color: this.state.list[0].profit > 0 ? "red" : "blue",
                }}
              >
                {this.state.list[0].profit}%
              </div>
            </div>
          </div>
          <br />
          <div className="tops">
            <div className="top3">
              2<div style={{ color: "white" }}>{this.state.list[1].id}</div>
              <div
                style={{
                  color: this.state.list[1].profit > 0 ? "red" : "blue",
                }}
              >
                {this.state.list[1].profit}%
              </div>
            </div>
            <br />
            <div className="top3">
              3<div style={{ color: "white" }}>{this.state.list[2].id}</div>
              <div
                style={{
                  color: this.state.list[2].profit > 0 ? "red" : "blue",
                }}
              >
                {this.state.list[2].profit}%
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="ranking3">
            4<div>{this.state.list[3].id}</div>
            <div
              style={{ color: this.state.list[3].profit > 0 ? "red" : "blue" }}
            >
              {this.state.list[3].profit}%
            </div>
          </div>
          <br />
          <div className="ranking3">
            5<div>{this.state.list[4].id}</div>
            <div
              style={{ color: this.state.list[4].profit > 0 ? "red" : "blue" }}
            >
              {this.state.list[4].profit}%
            </div>
          </div>
          <br />
          <div className="ranking3">
            6<div>{this.state.list[5].id}</div>
            <div
              style={{ color: this.state.list[5].profit > 0 ? "red" : "blue" }}
            >
              {this.state.list[5].profit}%
            </div>
          </div>
          <br />
          <div className="ranking3">
            7<div>{this.state.list[6].id}</div>
            <div
              style={{ color: this.state.list[6].profit > 0 ? "red" : "blue" }}
            >
              {this.state.list[6].profit}%
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Ranking;
