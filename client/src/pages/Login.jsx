import './../styles/Login.css'
import NavigationBar from "../components/Navigation";
import { useState } from 'react';
import { json } from 'react-router';

export default function Login() {
    const [id,setId] =useState("");
    const [pw,setPw] =useState("");
    const port = process.env.REACT_APP_PORT
    const userLogin = async()=>{
       
        const inputs = {
            email : id,
            password : pw
        }

        const data = JSON.stringify(inputs)
        

        try{
            const res = await fetch(port+'/api/user/login',{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: data
              });
              if(!res.ok){
                throw new Error("로그인 과정중에 문제가 생김")
              }
              const isLogined = await res.json();
              const token = JSON.stringify(isLogined.token)
              sessionStorage.setItem("token",token)
              alert("로그인 성공했습니다!")
              window.location.href="/"
              console.log(token)
        }catch(err){
           alert("아이디 또는 비밀번호가 잘못되었습니다. 다시 확인해주세요")
        }
        
    }

    return <div>
        <NavigationBar></NavigationBar>
        <div className='inputs'>
            <input placeholder="이메일" type="text" onChange={(e)=>{setId(e.target.value)}}/>
            <input placeholder="비밀번호" type="text" onChange={(e)=>{setPw(e.target.value)}}/>
            <input type="button" value="로그인 하기" onClick={userLogin}/>
        </div>

    </div>;
}