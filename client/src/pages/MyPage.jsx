import NavigationBar from "../components/Navigation";
import '../styles/MyPage.css'
import { useState } from "react";

export default function MyPage(user) {
    // const userinput = useState(user)
    const name = user.name;
    const nickName = user.nickName;
    const email = user.email;
    const pw = user.pw;
    const phoneNum = user.phoneNum;
    const location = user.location;

    const [userinput,setUserInput] = useState({
        name:name,
        nickName:nickName,
        email:email,
        pw:pw,
        phoneNum:phoneNum,
        location:location
    });

    return <>
        <NavigationBar></NavigationBar>
        <div className="contents">
            <div className="content">
                <div className="itemName">이름</div>
                <div className="itemContent">name</div>
                <button>수정</button>
            </div>            
            <div className="content">
                <div className="itemName">닉네임</div>
                <div className="itemContent">nickName</div>
                <button>수정</button>
            </div>
            <div className="content">
                <div className="itemName">이메일</div>
                <div className="itemContent">email</div>
            </div>
            <div className="content">
                <div className="itemName">비밀번호</div>
                <div className="itemContent">pw</div>
                <button>수정</button>
            </div>
            <div className="content">
                <div className="itemName">전화번호</div>
                <div className="itemContent">phoneNum</div>
                <button>수정</button>
            </div>
            <div className="content">
                <div className="itemName">주소</div>
                <div className="itemContent">location</div>
                <button>수정</button>
            </div>
        </div>
        <div className="delete">
            <button>삭제하기</button>
        </div>
    </>
}