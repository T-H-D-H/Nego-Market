import NavigationBar from "../components/Navigation";
import style from "./../styles/Home.module.css";
import mainContent from "./mainContents.json";
import { useState, useEffect } from "react";

export default function Home() {
	const port = process.env.REACT_APP_PORT;

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

	const [si, setSi] = useState();
	const [gu, setGu] = useState();
	const [dong, setDong] = useState();

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
	const loadDongData = async (e) => {
		
		const data = await fetch(
			port + "/api/address/dong?si=" + si + "&gu=" + e,
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
			<div className={style.selectLocation}>
				<span>인기 매물 </span>
				<div className={style.select}>
					<select
						onChange={async (e) => {
							setSi(e.target.value);
							setDongData("")
							loadGuData(e.target.value);
						}}
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
							<>no</>
						)}
					</select>
					<select
						onChange={(e) => {
							setGu(e.target.value);
							loadDongData(e.target.value);
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

			<div className={style.content}>
				{mainContent.map((content) => {
					return (
						<article className={style.product} key={content.title}>
							<a href="" className={style.product_link}>
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
							</a>
						</article>
					);
				})}
			</div>
		</div>
	);
}
