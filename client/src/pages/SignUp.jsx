import styled from "styled-components";
import NavigationBar from "../components/Navigation";
import './../styles/SignUp.css'
import { useState } from "react";

export default function SignUp() {
    const [nickName,setNickName] = useState("");
    const [name,setName] = useState("");
    const [location,setLocation] = useState("");
    const [phoneNum,setPhoneNumber] =useState("");
    const [pw,setPw] = useState("");
    const [email, setEmail] = useState("");
    
    const [nickNameErrMsg,setNickNameErrMsg] = useState("");
    const [nameErrMsg,setNameErrMsg] = useState("");
    const [locationErrMsg,setLocationErrMsg] = useState("");
    const [phoneNumErrMsg,setPhoneNumberErrMsg] = useState("");
    const [pwErrMsg,setPwErrMsg] = useState("");
    const [emailErrMsg, setEmailErrMsg] = useState("");

    const nickNameCheck = ()=>{
        console.log("닉네임 : "+nickName+"닉네임 길이:"+nickName.length);
        const reg = "^(?=.*[a-z0-9])[a-z0-9]{3,16}$"
        if(nickName.replace(reg,()=>{}))
       if(nickName.length < 2 || nickName.length >12){
        console.log("오류 발생")
        setNickNameErrMsg("닉네임의 길이는 2 ~ 12글자 입니다.");
       }
        
    }    
    const nameCheck = ()=>{
        console.log("이름 : "+name);
        setNameErrMsg("이름이 잘못되었다는 메세지");
    }
    const locationCheck = ()=>{
        console.log("지역 : "+location);
        setLocationErrMsg("지역이 잘못되었다는 메세지");
    }
    const phoneNumCheck = ()=>{
        console.log("전화번호 : "+phoneNum);
        setPhoneNumberErrMsg("전화번호가 잘못되었다는 메세지");
    }
    const pwCheck = ()=>{
        console.log("비밀번호 : "+pw);
        setPwErrMsg("비밀번호가 잘못되었다는 메세지");
    }
    const emailCheck = ()=>{
        console.log("이메일 : "+email);
        setEmailErrMsg("이메일이 잘못되었다는 메세지");
    }
    

    return <>
        <NavigationBar></NavigationBar>
        <div className="contents">
        <div className="formDiv">
        <input placeholder="이메일" className="inputs" onBlur={emailCheck} onChange={(e)=>{setEmail(e.target.value)}}/>
            
            <div>
                <b>{emailErrMsg} </b>
            </div>
            <input placeholder="비밀번호" className="inputs" onBlur={pwCheck} onChange={(e)=>{setPw(e.target.value)}}/>
            
            <div>
                <b>{pwErrMsg} </b>
            </div>
            <input placeholder="닉네임" className="inputs" onChange={(e)=>{setNickName(e.target.value)}}/>
            <button onClick={nickNameCheck}>닉네임 중복 확인</button>
            <div>
                <b>{nickNameErrMsg}</b>
            </div>
            
            <input placeholder="이름" className="inputs" onBlur={nameCheck} onChange={(e)=>{setName(e.target.value)}}/>
            <div>
                <b>{nameErrMsg} </b>
            </div>
            <input placeholder="지역" className="inputs" onBlur={locationCheck} onChange={(e)=>{setLocation(e.target.value)}}/>
            
            <div>
                <b>{locationErrMsg} </b>
            </div>
            <input placeholder="전화번호" className="inputs" onBlur={phoneNumCheck} onChange={(e)=>{setPhoneNumber(e.target.value)}}/>
            
            <div>
                <b>{phoneNumErrMsg} </b>
            </div>
            
            
            <input type="submit" value="회원가입" />
        </div>
        </div>
    </>;
}

