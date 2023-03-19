import NavigationBar from "../components/Navigation";
import style from "./../styles/Home.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
	const port = process.env.REACT_APP_PORT;
	const [mainContent, setMainContent] = useState();
	const [si, setSi] = useState();
	const [gu, setGu] = useState();
	const [dong, setDong] = useState();
	const loadMainContent = async () => {
		// 메인 콘텐츠들을 배열 형태로 가져오는 것.
		// 로그인 안했을때 , 했을때
		const token = JSON.parse(sessionStorage.getItem("token"));

		let res = [];
		token?
		 res = await fetch(port + "/api/products/my-address", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		}):res = await fetch(port + "/api/products", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
		const result = await res.json();

		setMainContent(result);
	};
	// 지역 선택 했을때, 구 선택 했을때, 동 선택했을때,
	const setMainContentByAddress = async (region,selectedRegion) => {
		if (region=="dong") {
			// 동으로 선택된게 있을때
			const res = await fetch(
				port + "/api/products/" + si + "/" + gu + "/" + selectedRegion,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const result = await res.json();
			setMainContent(result);
		}else if(region=="gu"){
			// 구로 선택된게 있을때
			const res = await fetch(
				port + "/api/products/" + si + "/" + selectedRegion ,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const result = await res.json();
			setMainContent(result);
		}else if(region=="si"){
			// 시로 선택된게 있을때
			const res = await fetch(
				port + "/api/products/" + selectedRegion ,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const result = await res.json();
			setMainContent(result);
		}
	};

	useEffect(() => {
		loadMainContent();
	}, []);

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

	return (
		<div>
			<NavigationBar></NavigationBar>
			<div className={style.mainTitle}>지역의 인기매물</div>

			<div className={style.content}>
				<div className={style.selectLocation}>
					<span>인기 매물 </span>
					<div className={style.select}>
						<select
							onChange={(e) => {
								setSi(e.target.value);
								setDongData("");
								loadGuData(e.target.value);
								setMainContentByAddress("si",e.target.value);
							}}
							value={si}
						>
							<option value="">지역을 선택하세요</option>
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
								setMainContentByAddress("gu",e.target.value);
								setMainContentByAddress();
							}}
						>
							<option value="">동네를 선택하세요</option>
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
								setMainContentByAddress();
								setMainContentByAddress("dong",e.target.value);
							}}
						>
							<option value="">동을 선택하세요</option>
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
				</div>
				{mainContent ? (
					mainContent.map((content) => {
						return (
							<article className={style.product} key={content.id}>
								<Link
									to={`/product/${content.id}`}
									className={style.product_link}
								>
									<div className={style.product_img}>
										<img
											src={content.img}
											alt={content.title}
											className={style.img}
										/>
									</div>
									<div className={style.product_desc}>
										<h2 className={style.product_title}>
											{content.title}
										</h2>
										<div className={style.product_price}>
											{content.price}
										</div>
										<div className={style.product_region}>
											{content.region}
										</div>
										<div className={style.product_count}>
											<span>관심 {content.good}</span> ∙{" "}
											<span>채팅 {content.chat}</span>
										</div>
									</div>
								</Link>
							</article>
						);
					})
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
