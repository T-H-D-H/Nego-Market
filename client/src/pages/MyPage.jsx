import NavigationBar from "../components/Navigation";
import style from './../styles/MyPage.module.css'
import { useState, useEffect } from "react";

export default function MyPage() {
    // const userinput = useState(user)
    // TODO: 토큰으로 회원 정보 가져오기 API연동하기

    const port = process.env.REACT_APP_PORT
    // 유저 정보 세팅
    const userLogined = async () => {
        const token = JSON.parse(sessionStorage.getItem("token"));
        console.log("Bearer "+token)
        // 모든 유저의 정보를 가져오게 함
        const user = await fetch(port + '/api/user/mypage', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer "+token,
            },
        })
        const result = await user.json();
        console.log(result);
        const ResUser = result;
        setEmail(ResUser.email)
        setName(ResUser.name)
        setPw("**********")
        setNickName(ResUser.nickname)
        setPhoneNum(ResUser.tel)
        setLocation(ResUser.si+" " + ResUser.gu+" " +ResUser.dong)
        console.log("userLogined")
    }

    useEffect(() => { userLogined(); }, []);


    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [name, setName] = useState("");
    const [nickName, setNickName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [location, setLocation] = useState("");



    const [emailDisabled, setEmailDisabled] = useState(true)
    const [pwDisabled, setPwDisabled] = useState(true)
    const [nameDisabled, setNameDisabled] = useState(true)
    const [nickDisabled, setNickDisabled] = useState(true)
    const [phoneDisabled, setPhoneDisabled] = useState(true)
    const [locationDisabled, setlocationDisabled] = useState(true)

    const disabledCheck = async (item, event) => {
        switch (event) {
            case "수정":
                console.log("수정 누름 ");
                break;
            case "완료":
                console.log("완료 누름");
                break;
            case "취소": console.log("취소 누름");
                console.log("email : " + email);
        }
        userLogined();
        switch (item) {
            case "email":
                if (emailDisabled) {
                    setEmailDisabled(false);
                } else {
                    setEmailDisabled(true);
                }
                break;
            case "pw":
                if (pwDisabled) {
                    setPwDisabled(false);
                } else {
                    setPwDisabled(true);
                }
                break;
            case "name":
                if (nameDisabled) {
                    setNameDisabled(false);
                } else {
                    setNameDisabled(true);
                }
                break;
            case "nickname":
                if (nickDisabled) {
                    setNickDisabled(false);
                } else {
                    setNickDisabled(true);
                }
                break;
            case "phone":
                if (phoneDisabled) {
                    setPhoneDisabled(false);
                } else {
                    setPhoneDisabled(true);
                }
                break;
            case "location":
                if (locationDisabled) {
                    setlocationDisabled(false);
                } else {
                    setlocationDisabled(true);
                }
                break;
        }

    }
    return <>
        <NavigationBar></NavigationBar>

        <div className={style.contents}>
            <h1 className={style.title}>회원정보</h1>
            <div className={style.content}>
                <span>아이디</span>
                <div hidden={!emailDisabled}>{email}</div>
                <input type="text" hidden={emailDisabled} placeholder={email} onChange={(e) => { setEmail(e.target.value); }} disabled={emailDisabled} />
                <div className={style.buttoncontents}>
                </div>
                
                
                
            </div>

            <div className={style.content}>
                <span>비밀번호</span> 
                <div hidden={!pwDisabled}>{pw}</div>
                <input type="text" hidden={pwDisabled} placeholder={pw} onChange={(e) => { setPw(e.target.value);}} disabled={pwDisabled} />
                <div className={style.buttoncontents}>
                <button onClick={() => disabledCheck("pw", "수정")} hidden={!pwDisabled}>비밀번호 수정</button>
                <button onClick={() => disabledCheck("pw", "완료")} hidden={pwDisabled}>완료</button>
                <button onClick={() => disabledCheck("pw", "취소")} hidden={pwDisabled}>취소</button>
                </div>
                
            </div>

            <div className={style.content}>
                <span>이름(실명)</span> 
                <div hidden={!nameDisabled}>{name}</div>
                <input type="text" hidden={nameDisabled} placeholder={name} onChange={(e) => { setName(e.target.value);}} disabled={nameDisabled} />
                <div className={style.buttoncontents}>
                </div>
                
            </div>

            <div className={style.content}>
                <span>닉네임</span> 
                <div hidden={!nickDisabled}>{nickName}</div>
                <input type="text" hidden={nickDisabled} placeholder={nickName} onChange={(e) => { setNickName(e.target.value);}} disabled={nickDisabled} />
                <div className={style.buttoncontents}>
                <button onClick={() => disabledCheck("nickname", "수정")} hidden={!nickDisabled}>닉네임 수정</button>
                <button onClick={() => disabledCheck("nickname", "완료")} hidden={nickDisabled}>완료</button>
                <button onClick={() => disabledCheck("nickname", "취소")} hidden={nickDisabled}>취소</button>
                </div>
                
            </div>

            <div className={style.content}>
                <span>휴대전화</span> 
                <div hidden={!phoneDisabled}>{phoneNum}</div>
                <input type="text" hidden={phoneDisabled} placeholder={phoneNum} onChange={(e) => { setPhoneNum(e.target.value);}} disabled={phoneDisabled} />
                <div className={style.buttoncontents}>
                <button onClick={() => disabledCheck("phone", "수정")} hidden={!phoneDisabled}>휴대전화 수정</button>
                <button onClick={() => disabledCheck("phone", "완료")} hidden={phoneDisabled}>완료</button>
                <button onClick={() => disabledCheck("phone", "취소")} hidden={phoneDisabled}>취소</button>
                </div>
                
            </div>

            <div className={style.content}>
            <span>지역</span> 
                <div hidden={!locationDisabled}>{location}</div>
                <input type="text" hidden={locationDisabled} placeholder={location} onChange={(e) => { setLocation(e.target.value);}} disabled={locationDisabled} />
                <div className={style.buttoncontents}>
                <button onClick={() => disabledCheck("location", "수정")} hidden={!locationDisabled}>지역 수정</button>
                <button onClick={() => disabledCheck("location", "완료")} hidden={locationDisabled}>완료</button>
                <button onClick={() => disabledCheck("location", "취소")} hidden={locationDisabled}>취소</button>
                </div>
                
            </div>
        </div>
    </>
}