import React, { Component } from "react";
import ReactDom from "react-dom";
import "../css/Portfolio.css";
import "../css/Button.css";
import shortStockInfos from "../dataframe.json";

var change = false;
var userInputAsset = 0;
var sname = "";
function handleChangeCost(e) {
  userInputAsset = e.target.value;
} //자산 추가 입력창에 입력 받기
function changeAsset() {
  change = true;
} //자산 변동
const PopupDom = ({ children }) => {
  const el = document.getElementById("popup");
  return ReactDom.createPortal(children, el);
};

function createData(stockName, quantity) {
  return { stockName, quantity };
}

//자산 추가 팝업
class PopupContent extends Component {
  render() {
    return (
      <div className="popup">
        <div className="common_alert">
          <input
            className="assetInput"
            type="number"
            onChange={handleChangeCost}
          />
          <button
            className="plusButton"
            type="button"
            onClick={(e) => {
              changeAsset(e);
              this.props.onClose();
            }}
          >
            확인
          </button>
          <div>
            <button
              className="closeButton"
              type="button"
              onClick={this.props.onClose}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: window.sessionStorage.getItem("userID"),
      asset: 10,
      totalAsset: 10,
      list: [
        {
          stockName: "삼성전자",
          quantity: 0,
        },
      ],
    };
    this.requestAsset();
    this.getStockInfo();
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  requestAsset = () => {
    const post = {
      query: "SELECT * FROM ACCOUNT WHERE UserID='" + this.state.userid + "';", //mysql로 전송할 쿼리 문
    };
    fetch("http://localhost:4000/SQL1", {
      // fetch("http://18.118.194.10:8080/SQL1", {
      //mysql fetch 서버 주소
      method: "post", // 통신방법
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          asset: json.Asset, //해당 사용자가 가지고 있는 현금 자산을 가지고옴
          totalAsset: json.TotalAsset, //해당 사용자가 가지고 있는 주식 자산을 가지고옴
        });
      });
  };

  chargeAsset = () => {
    const post = {
      query:
        "UPDATE ACCOUNT SET Asset=" +
        (this.state.asset + Number(userInputAsset)) +
        ",TotalAsset=" +
        (this.state.totalAsset + Number(userInputAsset)) +
        " WHERE UserID='" +
        this.state.userid +
        "';", //mysql로 전송할 쿼리 문
    };
    fetch("http://localhost:4000/SQL1", {
      // fetch("http://18.118.194.10:8080/SQL1", {
      //mysql fetch 서버 주소
      method: "post", // 통신방법
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    });
  };

  getStockInfo = () => {
    console.log("stockinfo");
    const post = {
      query:
        "SELECT * FROM MYSTOCKLIST WHERE UserID = '" + this.state.userid + "';",
    };
    console.log(post.query);
    fetch("http://localhost:4000/SQL2", {
      // fetch("http://18.118.194.10:8080/SQL2", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("json");
        console.log(json);

        this.state.list.shift();
        for (let i = 0; i < json.length; ++i) {
          this.setState({
            list: this.state.list.concat(
              createData(json[i].HoldingStockName, json[i].HoldingQuantity)
            ),
          });
        }
      });
  };

  handleAsset = () => {
    this.setState({
      asset: this.state.asset + Number(userInputAsset),
      totlaAsset: this.state.totalAsset + Number(userInputAsset),
    });
  };

  openPopup = () => {
    this.setState({ isOpenPopup: true });
  }; //팝업 오픈
  closePopup = () => {
    this.setState({ isOpenPopup: false });
    if (change == true) {
      this.setState({
        asset: this.state.asset + Number(userInputAsset),
        totalAsset: this.state.totalAsset + Number(userInputAsset),
      });
      this.chargeAsset();
    }
    change = false;
  }; //팝업 닫음 이때, 자산 추가

  logout = () => {
    window.sessionStorage.clear("userID");
    alert("로그아웃 되었습니다.");
    window.location.href = "./login";
  };

  clickToBuy = (e) => {
    sname = this.state.stockName;
    window.location.href = "/buy?stockName=" + sname;
  }; //매수 페이지로 이동 함수
  clickToSell = (e) => {
    sname = this.state.stockName;
    window.location.href = "/sell?stockName=" + sname;
  }; //매수 페이지로 이동 함수

  showStock = () =>
    this.state.list.map((stk) => {
      return (
        <div className="stocklist">
          <div className="portfolio2">
            <div
              onClick={() =>
                (window.location.href =
                  "/StockInformation?stockName=" + stk.stockName)
              }
              className="stockname"
            >
              {stk.stockName}
            </div>
            <div style={{ paddingTop: "0.5vh" }}>
              보유 잔고: {stk.quantity}{" "}
              {shortStockInfos.data
                .filter((data) => {
                  if (stk.stockName == data.종목) return data;
                })
                .map((data, index) => (
                  <div>평가금액: {data.현재가 * stk.quantity}원</div>
                ))}
            </div>
          </div>
          <div>
            <button
              className="buyButton"
              onClick={() => {
                window.location.href = "/buy?stockName=" + stk.stockName;
              }}
            >
              매수
            </button>
            <button
              className="sellButton"
              onClick={() => {
                window.location.href = "/sell?stockName=" + stk.stockName;
              }}
            >
              매도
            </button>
          </div>
        </div>
      );
    });

  render() {
    console.log(this.state);

    return (
      <body>
        <div className="right">
          <div>
            <button
              className="assetButton"
              type="button"
              id="popup"
              onClick={this.openPopup}
            >
              자산 추가
            </button>
          </div>
          {!this.state.isOpenPopup && (
            <button className="logoutButton" onClick={this.logout}>
              로그 아웃
            </button>
          )}
        </div>
        {this.state.isOpenPopup && (
          <PopupDom>
            <PopupContent onClose={this.closePopup} />
          </PopupDom>
        )}
        <div className="form-wrappernf">
          <div className="portfolio1">
            <t style={{ fontSize: "5vh" }}>{this.state.userid}</t>
            님의 보유 잔고
          </div>
          <div className="portfolio2">
            보유 자산:{" "}
            <t style={{ color: "rgb(231, 179, 66)" }}>
              {this.state.totalAsset}
            </t>
            원
            <br />
            투자 가능 금액:{" "}
            <t style={{ color: "rgb(231, 179, 66)" }}>{this.state.asset}</t>원
          </div>
        </div>
        <div className="portfolio3">
          보유 주식
          <br />
        </div>
        {this.showStock()}
      </body>
    );
  }
}

export default Portfolio;
