import { React, useState } from "react";
import "./Register.css";

function Register() {
  function handleClick(e) {
    window.location.href = "/login";
  }

  const [inputs, setInputs] = useState({
    id: "",
    pw: "",
    pwc: "",
    email: "",
    pwq: "",
    pwa: "",
  });

  const { id, pw, pwc, email, pwq, pwa } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onReset = () => {
    setInputs({
      id: "",
      pw: "",
      pwc: "",
      email: "",
      pwq: "",
      pwa: "",
    });
  };

  const submitCheck = () => {
    if (pw != pwc) alert("비밀번호를 다시 확인해주세요.");
  };

  const onSubmitHandler = (e) => {
    e.preveventDefault();

    console.log("Id: ", id);
    console.log("Pw: ", pw);
    console.log("PwC: ", pwc);
    console.log("Email: ", email);
    console.log("PwQ: ", pwq);
    console.log("PwA: ", pwa);
  };

  return (
    <div style={{ paddingTop: "5vh", paddingBottom: "5vh" }}>
      <h1 style={{ textAlign: "center" }}>SWEAP 회원가입</h1>
      <br />
      <form onSubmit={onSubmitHandler}>
        <div className="Register">
          <div className="TEXT">아이디</div>
          <input
            className="Input"
            name="id"
            placeholder=" 내용을 입력해주세요"
            onChange={onChange}
            value={id}
          />
        </div>
        <br />
        <div className="Register">
          <div className="TEXT">비밀번호</div>
          <input
            type="password"
            className="Input"
            name="pw"
            placeholder=" 내용을 입력해주세요"
            onChange={onChange}
            value={pw}
          />
        </div>
        {pw !== "" ? (
          <>
            <br />
            <div className="Register">
              <div className="TEXT">
                비밀번호 <br />
                확인
              </div>
              <input
                type="password"
                className="Input"
                name="pwc"
                placeholder=" 내용을 입력해주세요"
                onChange={onChange}
                value={pwc}
              />
            </div>
          </>
        ) : (
          <></>
        )}
        <br />
        <div className="Register">
          <div className="TEXT">e-mail</div>
          <input
            className="Input"
            name="email"
            placeholder=" 내용을 입력해주세요"
            onChange={onChange}
            value={email}
          />
        </div>
        <br />
        <div className="Register">
          <div className="TEXT">
            비밀번호 <br />
            질문선택
          </div>
          <select
            className="Input"
            name="pwq"
            placeholder=" 내용을 입력해주세요"
            onChange={onChange}
            value={pwq}
          >
            <option value="1">기억에 남는 추억의 장소는?</option>
            <option value="2">자신의 인생 좌우명은?</option>
            <option value="3">자신의 보물 제 1호는?</option>
            <option value="4">가장 기억에 남는 선생님 성함은?</option>
            <option value="5">다시 태어나면 되고 싶은 것은?</option>
          </select>
        </div>
        <br />
        <div className="Register">
          <div className="TEXT">
            비밀번호 <br />
            답변입력
          </div>
          <input
            className="Input"
            name="pwa"
            placeholder=" 내용을 입력해주세요"
            onChange={onChange}
            value={pwa}
          />
        </div>
        <br />
        <br />
        <div className="Button">
          {id === "" &&
          pw === "" &&
          pwc === "" &&
          email === "" &&
          pwq === "" &&
          pwa === "" ? (
            <button
              className="CancelButton"
              onClick={handleClick}
              type="button"
            >
              취소
            </button>
          ) : (
            <button className="CancelButton" onClick={onReset}>
              초기화
            </button>
          )}
          {id === "" ||
          pw === "" ||
          pwc === "" ||
          email === "" ||
          pwa === "" ? (
            <button
              disabled
              className="RegisterButton"
              onClick={submitCheck}
              type="submit"
            >
              회원가입
            </button>
          ) : (
            <button
              className="RegisterButton"
              onClick={submitCheck}
              type="submit"
            >
              회원가입
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Register;
