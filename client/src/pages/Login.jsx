import style from "./../styles/Login.module.css"
import { useState } from 'react';

export default function Login() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const port = process.env.REACT_APP_PORT
    const userLogin = async () => {

        const inputs = {
            email: id,
            password: pw
        }

        const data = JSON.stringify(inputs)


        try {
            const res = await fetch(port + '/api/user/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data
            });
            if (!res.ok) {
                throw new Error("로그인 과정중에 문제가 생김")
            }
            const isLogined = await res.json();
            const token = JSON.stringify(isLogined.token)
            sessionStorage.setItem("token", token)
            alert("로그인 성공했습니다!")
            window.location.href = "/"
            console.log(token)
        } catch (err) {
            alert("아이디 또는 비밀번호가 잘못되었습니다. 다시 확인해주세요")
        }

    }

    return <div className={style.center}>
        <div className={style.logo}>
            {/* <img src="dogeCoin.com.png" alt="로고 사진" className={style.img} /> */}
            <h1 className={style.name}>NEGO JANGTEO</h1>
        </div>

        <div className={style.inputs}>
            <input className={style.input} placeholder=" 아이디(이메일)" type="text" onChange={(e) => { setId(e.target.value) }} />
            <br />
            <input className={style.input} placeholder=" 비밀번호" type="password" onChange={(e) => { setPw(e.target.value) }} />
            <br />
            <input className={style.loginBtn} type="button" value="로그인" onClick={userLogin} />
            <p className={style.text}> <a className={style.no_a_line} href="/signup">회원가입</a> </p>
            {/* TODO: 비밀번호 나 아이디 찾기 페이지 완료시 이동하는 태그 넣기 */}
        </div>



    </div>;
}