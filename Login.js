import React, { useState } from "react";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import "../css/Login.css";

function Login() {
  const [inputs, setInputs] = useState({
    id: "",
    pw: "",
  });

  const { id, pw } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  function handleLogin() {
    let check1 = false;
    let check2 = false;
    let idc = false;
    let pwc = false;

    const post1 = {
      query:
        "SELECT EXISTS (SELECT * FROM USER WHERE UserID = '" +
        +id +
        "' LINIT 1) AS SUCCESS;",
    };
    fetch("http://18.118.194.10:8080/SQL", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post1),
    })
      .then((res1) => res1.json())
      .then((json) => {
        check1 = true;
        if (json) idc = true;
      });

    const post2 = {
      query:
        "SELECT EXISTS (SELECT * FROM USER WHERE Password = '" +
        +pw +
        "' LINIT 1) AS SUCCESS;",
    };
    fetch("http://18.118.194.10:8080/SQL", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post2),
    })
      .then((res2) => res2.json())
      .then((json) => {
        check2 = true;
        if (json) pwc = true;
      });

    if (check1 && check2) {
      if (idc && pwc) {
        window.sessionStorage.setItem("id", id);
        window.sessionStorage.setItem("pw", pw);
        window.location.href = "/home";
      } else alert("ID/PW를 다시 확인해주세요.");
    }
  }

  function toRegister(e) {
    window.location.href = "/register";
  }

  return (
    <>
      <div className="Login">
        <br />
        SWEAP
        <br />
        <RiMoneyDollarCircleLine size="150" />
      </div>
      <form>
        <br />
        <div className="Login2">
          <input
            className="LInput"
            name="id"
            placeholder=" ID"
            onChange={onChange}
            value={id}
          />
          <br />
          <br />
          <input
            className="LInput"
            name="pw"
            placeholder=" PW"
            onChange={onChange}
            value={pw}
          />
        </div>
        <br />
        <br />
      </form>
      <div className="Buttons">
        <button className="LoginButton" onClick={handleLogin}>
          로그인
        </button>
        <button className="LRegisterButton" onClick={toRegister}>
          회원가입
        </button>
      </div>
    </>
  );
}

export default Login;
