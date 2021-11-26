import React from "react";
import "../css/Contest.css";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";

let start = true;

class Contest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contestNum: 0,
      contestName: "",
      startDate: "",
      finishDate: "",
      preStartDate: "",
      preFinishDate: "",

      userID: "kim",
      profit: 120,
    };
  }

  getContestInfo = () => {
    start = false;
    const post = {
      query: "SELECT * FROM CONTEST ORDER BY ContestNum DESC LIMIT 1;",
    };
    fetch("http://18.118.194.10:8080/SQL", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          contestNum: json.ContestNum,
          contestName: json.ContestName,
          startDate: json.StartDate,
          finishDate: json.FinishDate,
          preStartDate: json.PreStartDate,
          preFinishDate: json.PreFinishDate,
        });
      });
  };

  getPortpolioInfo = () => {
    const post = {
      query:
        "SELECT Profit FROM PORTFOLIO WHERE UserID = '" +
        this.state.userID +
        "';",
    };
    fetch("http://18.118.194.10:8080/SQL", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          profit: json.Profit,
        });
        console.log("포트폴리오인포");
      });
  };

  participate = () => {
    console.log(this.state);
    const post = {
      query:
        // "INSERT INTO PARTICIPATE (UserID, InitialProfit, ContestNum) VALUES ('park', 12231, 2);",

        "INSERT INTO PARTICIPATE (UserID, InitialProfit, ContestNum) VALUES ('" +
        +this.state.userID +
        "'," +
        this.state.profit +
        "," +
        this.state.contestNum +
        ");",
    };
    console.log(post.query);

    fetch("http://18.118.194.10:8080/SQL", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    });
    alert("참가 신청이 완료되었습니다.");

    // const post = {
    //   query:
    //     "SELECT EXISTS (SELECT * FROM PARTICIPATE WHERE UserID = '" +
    //     +this.state.userID +
    //     "' LINIT 1) AS SUCCESS;", // 사용자가 이미 참가자명단에 있으면 1 리턴
    // };
    // fetch("http://18.118.194.10:8080/SQL", {
    //   method: "post",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify(post),
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     console.log("asdfsfsdfdsfs");
    //     if (json) {
    //       alert("이미 참가 신청된 상태입니다");
    //     } else {
    //       const post2 = {
    //         query:
    //           "INSERT INTO PARTICIPATE UserID (UserID, InitialProfit) VALUES ('" +
    //           +this.state.userID +
    //           "'," +
    //           this.state.profit +
    //           "');",
    //       };

    //       fetch("http://18.118.194.10:8080/SQL", {
    //         method: "post",
    //         headers: { "content-type": "application/json" },
    //         body: JSON.stringify(post2),
    //       });

    //       alert("참가 신청이 완료되었습니다.");
    //     }
    //   });

    // window.location.href = "/home";
  };

  render() {
    start = true;
    start && this.getContestInfo();
    // this.getPortpolioInfo();
    return (
      <>
        {/* <button onClick={this.getContestInfo}>contest</button> */}
        <button onClick={this.getPortpolioInfo}>portpolio</button>
        <NavLink to="/">
          <IoIosArrowBack size="40" />
        </NavLink>
        <div className="contest1">
          <br />
          {this.state.contestName}
          <br />
          참가자 모집
        </div>
        <div className="contest2">
          <br />
          대회 기간
          <br />
          {this.state.startDate} ~ {this.state.finishDate}
          <br />
          <br />
          신청 기간
          <br />
          {this.state.preStartDate} ~ {this.state.preFinishDate}
          <br />
          <br />
        </div>
        <div>
          <RiMoneyDollarCircleLine size="150" />
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          <button className="ContestButton" onClick={this.participate}>
            참가신청
          </button>
        </div>
      </>
    );
  }
}

export default Contest;
