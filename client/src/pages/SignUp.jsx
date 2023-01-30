import NavigationBar from "../components/Navigation";
import './../styles/SignUp.css'
import { useState } from "react";
// TODO: inputs 크기 늘리기
// 지역 시 , 구 , 동 으로 선택하게 끔.
// 이메일 : max : 5이상 64자 이하 ()
// 닉네임 : 2~10글자 
// 이름 : 2~ 16글자 한국어
// 회원가입시 중복확인 버튼 등 버튼 자체를 없앰.
// 비밀번호 : 8 ~ 16 특수문자 1개 이상, 영어로만(영어 대소문자 구분함) 
export default function SignUp() {
    const port = process.env.REACT_APP_PORT
    // 인풋 값들 상태 관리
    const [nickName, setNickName] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [phoneNum, setPhoneNumber] = useState("");
    const [pw, setPw] = useState("");
    const [pwConfirm, setPwConfirm] =useState("");
    const [email, setEmail] = useState("");

    // 에러 메세지들 상태관리
    const [nickNameErrMsg, setNickNameErrMsg] = useState("");
    const [nameErrMsg, setNameErrMsg] = useState("");
    const [locationErrMsg, setLocationErrMsg] = useState("");
    const [phoneNumErrMsg, setPhoneNumberErrMsg] = useState("");
    const [pwErrMsg, setPwErrMsg] = useState("");
    const [pwConfirmErrMsg,setPwConfirmErrMsg] = useState("");
    const [emailErrMsg, setEmailErrMsg] = useState("");
    
    // ----------- 인풋 값들 규칙 확인 -----------
    // 닉네임 규칙 확인
    // 길이 확인, 중복 확인
    const nickNameCheck = async() => {
        const data = JSON.stringify({
            nickname:nickName
        })
        const res = await fetch(port+`/api/user/nickname-duplication-check`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: data
          });
          const isSigned = await res.json();
        if (nickName.length < 2 || nickName.length > 16) {
            setNickNameErrMsg("닉네임의 길이는 2 ~ 16글자 입니다.");
        }else if(isSigned.result){
            setNickNameErrMsg("이미 있는 닉네임 입니다.")
        } 
        else {
            setNickNameErrMsg("");
        }
    }

    // 이름 규칙 확인
    // 길이 확인
    const nameCheck = () => {
        const reg = /^[가-힣]{2,16}$/
        if (!reg.test(name)) {
            setNameErrMsg("이름은 2글자이상 16글자 이하의 한글 입니다.");
        } else {
            setNameErrMsg("");
        }
    }

    // 지역 규칙 확인
    // TODO: 3개로 나눠서 선택한 값 판단하기
    const locationCheck = () => {
        // TODO : 지역확인에서는 시, 구, 동 에 해당하는 값들이 들어가 있는지 확인
        const si = "시";
        const gu = "구";
        const dong = " 동";
        if (si == "시") { // TODO: 시,구,동에 해당하는 값들이 들어갔는지 확인하는 조건문
            setLocationErrMsg("지역이 잘못되었다는 메세지");
        } else { setLocationErrMsg("") }
    }

    // 휴대폰 번호 확인
    const phoneNumCheck = () => {
        const reg = /\d{3}-\d{4}-\d{4}/;
        if (!reg.test(phoneNum)) {
            setPhoneNumberErrMsg("전화번호는 \"숫자3개-숫자4개-숫자4\"개의 형식입니다.");
        } else { setPhoneNumberErrMsg("") }

    }

    // 비밀번호 확인
    const pwCheck = () => {
        const reg = /^(?=.*[!@#\$%\^&\*])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d!@#\$%\^&\*]{8,16}$/i
        if(!reg.test(pw)){
            setPwErrMsg("비밀번호가 잘못되었다는 메세지");
        }else{
            setPwErrMsg("")
        }
        pwconfirmCheck();
    }

    // 비밀번호 2차 확인
    const pwconfirmCheck = ()=>{
        if(pw == pwConfirm){
            setPwConfirmErrMsg("");
        }else{
            setPwConfirmErrMsg("비밀번호 확인 값이 다릅니다.");
            setPwErrMsg("")
        }
        pwCheck();
    }

    // 이메일 확인
    // @들어가 있는지 확인, 중복 확인
    const emailCheck = async() => {
        const data = JSON.stringify({
            email:email
        })
        const res = await fetch(port+`/api/user/id-duplication-check`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: data
          });
        const isSigned = await res.json();
        const reg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
        if(!reg.test(email)){
            setEmailErrMsg("이메일의 형식에 맞지 않습니다.");
        }else if(isSigned.result){
            setEmailErrMsg("이미 가입이 된 이메일 입니다.")
        }else{
            setEmailErrMsg("");
        }
    }

    const  registerCheck =  ()=>{
         nameCheck();
        emailCheck();
        nickNameCheck();
        locationCheck();
        pwCheck();
        phoneNumCheck();
    }
    async function RegisterUser(){
        const userInput ={
            name :name,
            email : email,
            password : pw,
            nickname : nickName,
            address : location,
            tel : phoneNum
        }

        const data = JSON.stringify(userInput)
        
        const res = await fetch(port+`/api/user/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: data
          });
          // 응답이 제대로 됬다면 홈페이지로 이동
          if(res.status==201){
            alert("회원가입이 완료됬습니다.")
            window.location.href = "/"
          }else{
            registerCheck();
          }
        
    }

    return <>
        <NavigationBar> </NavigationBar>
        <div className="contents">
            <div className="formDiv">
                <input placeholder="이메일" className="inputs" onBlur={emailCheck} onChange={(e) => { setEmail(e.target.value) }} />
                <div>
                    <b>{emailErrMsg} </b>
                </div>

                <input placeholder="비밀번호" className="inputs" onBlur={pwCheck} onChange={(e) => { setPw(e.target.value) }} />
                <div>
                    <b>{pwErrMsg} </b>
                </div>

                <input placeholder="비밀번호확인" className="inputs" onBlur={pwconfirmCheck} onChange={(e) => { setPwConfirm(e.target.value) }} />
                <div>
                    <b>{pwConfirmErrMsg} </b>
                </div>

                <input placeholder="닉네임" className="inputs" onChange={(e) => { setNickName(e.target.value) }} />
                <button onClick={nickNameCheck}>닉네임 중복 확인</button>
                <div>
                    <b>{nickNameErrMsg}</b>
                </div>

                <input placeholder="이름" className="inputs" onBlur={nameCheck} onChange={(e) => { setName(e.target.value) }} />
                <div>
                    <b>{nameErrMsg} </b>
                </div>
                <input placeholder="지역" className="inputs" onBlur={locationCheck} onChange={(e) => { setLocation(e.target.value) }} />

                <div>
                    <b>{locationErrMsg} </b>
                </div>
                <input placeholder="전화번호" className="inputs" onBlur={phoneNumCheck} onChange={(e) => { setPhoneNumber(e.target.value) }} />

                <div>
                    <b>{phoneNumErrMsg} </b>
                </div>


                <input type="submit" value="회원가입" onClick={RegisterUser}/>
            </div>
        </div>
    </>;
}

