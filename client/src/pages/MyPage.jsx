import NavigationBar from "../components/Navigation";
import style from "./../styles/MyPage.module.css";
import { useState, useEffect } from "react";

export default function MyPage() {
	// const userinput = useState(user)
	// TODO: 토큰으로 회원 정보 가져오기 API연동하기

	const port = process.env.REACT_APP_PORT;
	const token = JSON.parse(sessionStorage.getItem("token"));
	// 유저 정보 세팅
	const userLogined = async () => {
		// 모든 유저의 정보를 가져오게 함
		const user = await fetch(port + "/api/user/mypage", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});

		if (!user.ok) {
			alert("잘못된 접근입니다. 홈페이지로 이동합니다.");
			window.location.href = "/";
		}
		const result = await user.json();
		const ResUser = result;
		setEmail(ResUser.email);
		setName(ResUser.name);
		setPw("**********");
		setNickName(ResUser.nickname);
		setPhoneNum(ResUser.tel);
		setLocation(ResUser.si + " " + ResUser.gu + " " + ResUser.dong);
	};

	useEffect(() => {
		userLogined();
	}, []);

	const [email, setEmail] = useState("");
	const [pw, setPw] = useState("");
	const [name, setName] = useState("");
	const [nickName, setNickName] = useState("");
	const [phoneNum, setPhoneNum] = useState("");
	const [location, setLocation] = useState();
	const [si, setSi] = useState();
	const [gu, setGu] = useState();
	const [dong, setDong] = useState();

	const [emailDisabled, setEmailDisabled] = useState(true);
	const [pwDisabled, setPwDisabled] = useState(true);
	const [nameDisabled, setNameDisabled] = useState(true);
	const [nickDisabled, setNickDisabled] = useState(true);
	const [phoneDisabled, setPhoneDisabled] = useState(true);
	const [locationDisabled, setlocationDisabled] = useState(true);

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

	const disabledCheck = async (item, event) => {
		let data = {};
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
			case "new_nickname":
				data = {
					email,
					new_nickname: nickName,
					new_tel: null,
					new_address_name: null,
				};
				if (nickDisabled) {
					setNickDisabled(false);
				} else {
					setNickDisabled(true);
				}
				break;
			case "new_tel":
				data = {
					email,
					new_nickname: null,
					new_tel: phoneNum,
					new_address_name: null,
				};
				if (phoneDisabled) {
					setPhoneDisabled(false);
				} else {
					setPhoneDisabled(true);
				}
				break;
			case "new_address_name":
				data = {
					email,
					new_nickname: null,
					new_tel: null,
					new_address_name: si+" "+gu+" "+dong,
				};
                console.log("주소 완료 버튼 누름",location)
				if (locationDisabled) {
					setlocationDisabled(false);
				} else {
					setlocationDisabled(true);
				}
				break;
		}

		switch (event) {
			case "수정":
				break;
			case "완료":
				await fetch(port + "/api/user", {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
					body: JSON.stringify(data),
				});
				break;
			case "취소":
		}

		userLogined();
	};
	return (
		<>
			<NavigationBar></NavigationBar>

			<div className={style.contents}>
				<h1 className={style.title}>회원정보</h1>
				<div className={style.content}>
					<span>아이디</span>
					<div hidden={!emailDisabled}>{email}</div>
					<input
						type="text"
						hidden={emailDisabled}
						placeholder={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						disabled={emailDisabled}
					/>
					<div className={style.buttoncontents}></div>
				</div>

				<div className={style.content}>
					<span>비밀번호</span>
					<div hidden={!pwDisabled}>{pw}</div>
					<input
						type="text"
						hidden={pwDisabled}
						placeholder={pw}
						onChange={(e) => {
							setPw(e.target.value);
						}}
						disabled={pwDisabled}
					/>
					<div className={style.buttoncontents}>
						<button
							onClick={() => disabledCheck("pw", "수정")}
							hidden={!pwDisabled}
						>
							비밀번호 수정
						</button>
						<button
							onClick={() => disabledCheck("pw", "완료")}
							hidden={pwDisabled}
						>
							완료
						</button>
						<button
							onClick={() => disabledCheck("pw", "취소")}
							hidden={pwDisabled}
						>
							취소
						</button>
					</div>
				</div>

				<div className={style.content}>
					<span>이름(실명)</span>
					<div hidden={!nameDisabled}>{name}</div>
					<input
						type="text"
						hidden={nameDisabled}
						placeholder={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						disabled={nameDisabled}
					/>
					<div className={style.buttoncontents}></div>
				</div>

				<div className={style.content}>
					<span>닉네임</span>
					<div hidden={!nickDisabled}>{nickName}</div>
					<input
						type="text"
						hidden={nickDisabled}
						placeholder={nickName}
						onChange={(e) => {
							setNickName(e.target.value);
						}}
						disabled={nickDisabled}
					/>
					<div className={style.buttoncontents}>
						<button
							onClick={() =>
								disabledCheck("new_nickname", "수정")
							}
							hidden={!nickDisabled}
						>
							닉네임 수정
						</button>
						<button
							onClick={() =>
								disabledCheck("new_nickname", "완료", nickName)
							}
							hidden={nickDisabled}
						>
							완료
						</button>
						<button
							onClick={() =>
								disabledCheck("new_nickname", "취소")
							}
							hidden={nickDisabled}
						>
							취소
						</button>
					</div>
				</div>

				<div className={style.content}>
					<span>휴대전화</span>
					<div hidden={!phoneDisabled}>{phoneNum}</div>
					<input
						type="text"
						hidden={phoneDisabled}
						placeholder={phoneNum}
						onChange={(e) => {
							setPhoneNum(e.target.value);
						}}
						disabled={phoneDisabled}
					/>
					<div className={style.buttoncontents}>
						<button
							onClick={() => disabledCheck("new_tel", "수정")}
							hidden={!phoneDisabled}
						>
							휴대전화 수정
						</button>
						<button
							onClick={() => disabledCheck("new_tel", "완료")}
							hidden={phoneDisabled}
						>
							완료
						</button>
						<button
							onClick={() => disabledCheck("new_tel", "취소")}
							hidden={phoneDisabled}
						>
							취소
						</button>
					</div>
				</div>

				<div className={style.content}>
					<span>지역</span>
					<div hidden={!locationDisabled}>{location}</div>
					{/* <input
						type="text"
						hidden={locationDisabled}
						placeholder={location}
						onChange={(e) => {
							setLocation(e.target.value);
						}}
						disabled={locationDisabled}
					/> */}
					<div className={style.select} hidden={locationDisabled}>
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
					<div className={style.buttoncontents}>
						<button
							onClick={() =>
								disabledCheck("new_address_name", "수정")
							}
							hidden={!locationDisabled}
						>
							지역 수정
						</button>
						<button
							onClick={() =>{ 
                                if(!si||!gu||!dong){
                                    alert("지역을 끝까지 선택해주세요!");
                                    return;
                                }
                                console.log(si+" "+gu+" "+dong);
                                
								disabledCheck("new_address_name", "완료")}
                               
							}
							hidden={locationDisabled}
						>
							완료
						</button>
						<button
							onClick={() =>
								disabledCheck("new_address_name", "취소")
							}
							hidden={locationDisabled}
						>
							취소
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
