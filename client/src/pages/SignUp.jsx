import styled from "styled-components";
import NavigationBar from "../components/Navigation";
import './../styles/SignUp.css'
import { useState } from "react";

export default function SignUp() {

    const [id,setId] = useState('');
    const [pw,setPw] = useState('');
    const [pwConfirm,setPwConfirm] = useState('');
    const [phone,setPhone] = useState('');
    const [local,setLocal] = useState('');
    return <>
        <NavigationBar></NavigationBar>
        
        
    </>;
}

