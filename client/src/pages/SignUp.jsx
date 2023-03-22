import NavigationBar from "../components/Navigation";
import style from "./../styles/SignUp.module.css";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// TODO: inputs 크기 늘리기
// 지역 시 , 구 , 동 으로 선택하게 끔.
// 이메일 : max : 5이상 64자 이하 ()
// 닉네임 : 2~10글자
// 이름 : 2~ 16글자 한국어
// 회원가입시 중복확인 버튼 등 버튼 자체를 없앰.
// 비밀번호 : 8 ~ 16 특수문자 1개 이상, 영어로만(영어 대소문자 구분함)
export default function SignUp() {
	const port = process.env.REACT_APP_PORT;
	// 인풋 값들 상태 관리
	const [nickName, setNickName] = useState("");
	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [phoneNum, setPhoneNumber] = useState("");
	const [pw, setPw] = useState("");
	const [pwConfirm, setPwConfirm] = useState("");
	const [email, setEmail] = useState("");
	const [si, setSi] = useState("");
	const [gu, setGu] = useState("");
	const [dong, setDong] = useState("");

	// 에러 메세지들 상태관리
	const [nickNameErrMsg, setNickNameErrMsg] = useState("");
	const [nameErrMsg, setNameErrMsg] = useState("");
	const [locationErrMsg, setLocationErrMsg] = useState("");
	const [phoneNumErrMsg, setPhoneNumberErrMsg] = useState("");
	const [pwErrMsg, setPwErrMsg] = useState("");
	const [pwConfirmErrMsg, setPwConfirmErrMsg] = useState("");
	const [emailErrMsg, setEmailErrMsg] = useState("");

	// ----------- 인풋 값들 규칙 확인 -----------
	// 닉네임 규칙 확인
	// 길이 확인, 중복 확인
	const nickNameCheck = async () => {
		const data = JSON.stringify({
			nickname: nickName,
		});
		const res = await fetch(port + `/api/user/nickname-duplication-check`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: data,
		});
		const isSigned = await res.json();
		if (nickName.length < 2 || nickName.length > 16) {
			setNickNameErrMsg("닉네임의 길이는 2 ~ 16글자 입니다.");
		} else if (isSigned.result) {
			setNickNameErrMsg("이미 있는 닉네임 입니다.");
		} else {
			setNickNameErrMsg("");
		}
	};

	// 이름 규칙 확인
	// 길이 확인
	const nameCheck = () => {
		const reg = /^[가-힣]{2,16}$/;
		if (!reg.test(name)) {
			setNameErrMsg("이름은 2글자이상 16글자 이하의 한글 입니다.");
		} else {
			setNameErrMsg("");
		}
	};

	// 지역 규칙 확인
	// TODO: 3개로 나눠서 선택한 값 판단하기
	const locationCheck = () => {
		// TODO : 지역확인에서는 시, 구, 동 에 해당하는 값들이 들어가 있는지 확인

		if (!si || !gu || !dong) {
			// TODO: 시,구,동에 해당하는 값들이 들어갔는지 확인하는 조건문
			setLocationErrMsg("시,구,동을 전부 선택해주세요");
		} else {
			setLocationErrMsg("");
		}
	};

	// 휴대폰 번호 확인
	const phoneNumCheck = () => {
		const reg = /\d{3}-\d{4}-\d{4}/;
		if (!reg.test(phoneNum)) {
			setPhoneNumberErrMsg(
				'전화번호는 "숫자3개-숫자4개-숫자4"개의 형식입니다.'
			);
		} else {
			setPhoneNumberErrMsg("");
		}
	};

	// 비밀번호 확인
	const pwCheck = () => {
		const reg =
			/^(?=.*[!@#\$%\^&\*])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d!@#\$%\^&\*]{8,16}$/i;
		if (!reg.test(pw)) {
			setPwErrMsg("비밀번호가 잘못되었다는 메세지");
		} else {
			setPwErrMsg("");
		}
		pwconfirmCheck();
	};

	// 비밀번호 2차 확인
	const pwconfirmCheck = () => {
		if (pw == pwConfirm) {
			setPwConfirmErrMsg("");
		} else {
			setPwConfirmErrMsg("비밀번호 확인 값이 다릅니다.");
			setPwErrMsg("");
		}
		pwCheck();
	};

	// 이메일 확인
	// @들어가 있는지 확인, 중복 확인
	const emailCheck = async () => {
		const data = JSON.stringify({
			email: email,
		});
		const res = await fetch(port + `/api/user/id-duplication-check`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: data,
		});
		const isSigned = await res.json();
		const reg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
		if (!reg.test(email)) {
			setEmailErrMsg("이메일의 형식에 맞지 않습니다.");
		} else if (isSigned.result) {
			setEmailErrMsg("이미 가입이 된 이메일 입니다.");
		} else {
			setEmailErrMsg("");
		}
	};

	const registerCheck = () => {
		nameCheck();
		emailCheck();
		nickNameCheck();
		locationCheck();
		pwCheck();
		phoneNumCheck();
	};
	async function RegisterUser() {
        const newAddress = si+" "+gu+" "+dong
		const userInput = {
			name: name,
			email: email,
			password: pw,
			nickname: nickName,
			address: newAddress,
			tel: phoneNum,
		};
        

		const data = JSON.stringify(userInput);
        console.log(data);

		const res = await fetch(port + `/api/user/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: data,
		});
		// 응답이 제대로 됬다면 홈페이지로 이동
		if (res.status == 201) {
			alert("회원가입이 완료됬습니다.");
			window.location.href = "/";
		} else {
			registerCheck();
		}
	}

	const [getData, setGetData] = useState();
	const regionLoad = async () => {
		const region = await fetch(port + "/api/address/si", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await region.json();
		setGetData(result);
	};

	useEffect(() => {
		regionLoad();
	}, []);

	const [guData, setGuData] = useState();
	useEffect(() => {
		setGuData([]);
	}, [si]);
	const loadGuData = async (e) => {
		const data = await fetch(port + "/api/address/gu?si=" + e, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await data.json();
		if (!result.result) {
			setGuData(result);
		}
	};

	const [dongData, setDongData] = useState();
	useEffect(() => {
		setDongData([]);
	}, [gu]);
	const loadDongData = async (gu) => {
		const data = await fetch(
			port + "/api/address/dong?si=" + si + "&gu=" + gu,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const result = await data.json();
		if (!result.result) {
			setDongData(result);
		}
	};

	return (
		<>
			<div className={style.logo}>
				<Link to="/" style={{"textDecoration":"none",color:"black",fontWeight:"bold"}}><span >NEGO JANGTEO</span>
				</Link>
			</div>
			<div className={style.formTag}>
				<div className={style.categoryTag}>
					<span>아이디</span>
					<input
						placeholder="이메일"
						onBlur={emailCheck}
						className={style.categoryTag_input}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<div className={style.errorDiv}>
						<b>{emailErrMsg} </b>
					</div>
				</div>

				<div className={style.categoryTag}>
					<span>비밀번호</span>
					<input
						type="password"
						placeholder="비밀번호"
						onBlur={pwCheck}
						className={style.categoryTag_input}
						onChange={(e) => {
							setPw(e.target.value);
						}}
					/>
					<div className={style.errorDiv}>
						<b>{pwErrMsg} </b>
					</div>
				</div>
				<div className={style.categoryTag}>
					<span>비밀번호 확인</span>
					<input
						type="password"
						placeholder="비밀번호확인"
						onBlur={pwconfirmCheck}
						className={style.categoryTag_input}
						onChange={(e) => {
							setPwConfirm(e.target.value);
						}}
					/>
					<div className={style.errorDiv}>
						<b>{pwConfirmErrMsg} </b>
					</div>
				</div>

				<div className={style.categoryTag}>
					<span>이름</span>
					<input
						placeholder="이름"
						onBlur={nameCheck}
						className={style.categoryTag_input}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
					<div className={style.errorDiv}>
						<b>{nameErrMsg} </b>
					</div>
				</div>

				<div className={style.categoryTag}>
					<span>닉네임</span>
					<input
						placeholder="닉네임"
						onBlur={nickNameCheck}
						className={style.categoryTag_input}
						onChange={(e) => {
							setNickName(e.target.value);
						}}
					/>
					<div className={style.errorDiv}>
						<b>{nickNameErrMsg}</b>
					</div>
				</div>

				<div className={style.categoryTag}>
					<span>지역</span>

					<div className={style.select}>
						<select
							onChange={(e) => {
								setSi(e.target.value);
								setDongData("");
								loadGuData(e.target.value);
							}}
							value={si}
						>
							<option value="">지역 선택</option>
							{getData ? (
								<>
									{getData.map((e) => {
										return (
											<option key={e} value={e}>
												{e}
											</option>
										);
									})}
								</>
							) : (
								<></>
							)}
						</select>
						<select
							onChange={(e) => {
								setGu(e.target.value);
								loadDongData(e.target.value);
							}}
						>
							<option value="">동네 선택</option>
							{guData ? (
								<>
									{guData.map((e) => {
										return (
											<option key={e} value={e}>
												{e}
											</option>
										);
									})}
								</>
							) : (
								<></>
							)}
						</select>
						<select
							onChange={(e) => {
								setDong(e.target.value);
							}}
						>
							<option value="">동 선택</option>
							{dongData ? (
								<>
									{dongData.map((e) => {
										return (
											<option key={e} value={e}>
												{e}
											</option>
										);
									})}
								</>
							) : (
								<></>
							)}
						</select>
					</div>
					<div className={style.errorDiv}>
						<b>{locationErrMsg} </b>
					</div>
				</div>
				<div className={style.categoryTag}>
					<span>전화번호</span>
					<input
						placeholder="전화번호"
						onBlur={phoneNumCheck}
						className={style.categoryTag_input}
						onChange={(e) => {
							setPhoneNumber(e.target.value);
						}}
					/>

					<div className={style.errorDiv}>
						<b>{phoneNumErrMsg} </b>
					</div>
				</div>

				<input
					type="submit"
					value="가입하기"
					className={style.submitBtn}
					onClick={RegisterUser}
				/>
			</div>
		</>
	);
}