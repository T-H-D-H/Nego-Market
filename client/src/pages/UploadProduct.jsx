import NavigationBar from "../components/Navigation";
import style from "./../styles/UploadProduct.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
export default function UploadProduct() {
	const port = process.env.REACT_APP_PORT;

	// 상품 업로드시 필요한 State
	const [productTitle, setProductTitle] = useState();
	const [productArticle, setProductArticle] = useState();
	const [prodcutPrice, setProductPrice] = useState();
	const [productTag, setProductTag] = useState();
	const [image, setImage] = useState([]);

	// 미리보기 용 이미지State
	const [showImages, setShowImages] = useState([]);

	const handleImages = (images) => {
		// 보낼 이미지 데이터 변수에 넣고, 선택한 이미지들 보이게 하기
		// 최대 사진 갯수는 10개
		const imageFiles = images.target.files;
		console.log(imageFiles);
		let imageUrls = [...showImages];
		let imageFilesformData = [...image];

		for (let i = 0; i < imageFiles.length; i++) {
			const currentImageUrl = URL.createObjectURL(imageFiles[i]);
			imageUrls.push(currentImageUrl);
		}
		for (let i = 0; i < 3; i++) {
			if (!imageFilesformData[i]) {
				imageFilesformData[i] = imageFiles[i];
			}
		}

		if (imageUrls.length > 3) {
			imageUrls = imageUrls.slice(0, 3);
			alert("사진 넣을때 :사진은 3개까지 가능합니다.");
		}
		console.log(imageFilesformData);
		setShowImages(imageUrls);
		setImage(imageFilesformData);
	};

	// 사진 옆 삭제 버튼 눌렀을때
	const handleDeleteImage = (id) => {
		// 보이는 사진 삭제
		// filter : 선택 요소, 인덱스, 배열
		setShowImages(showImages.filter((_, index) => index !== id));
		// TODO: image State에서도 삭제해야함.
		setImage(image.filter((_, index) => index !== id));
	};

	const submitProduct = async (e) => {
		const token = JSON.parse(sessionStorage.getItem("token"));
		let formDatas = new FormData();
		e.preventDefault();
		for (let i = 0; i < image.length; i++) {
			formDatas.append("imgs", image[i]);
		}
		const tagList = productTag.split(" ");
		if (tagList.length > 10) {
			alert("태그는 최대 10개까지입니다.");
			return;
		}

		formDatas.append("title", productTitle);
		formDatas.append("content", productArticle);
		formDatas.append("price", prodcutPrice);
		formDatas.append("tags", tagList);

		const res = await fetch(port + "/api/product", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + token,
			},
			body: formDatas,
		});

		if (res.status != 201) {
			console.log(res);
			alert("등록에 실패 했습니다. 다시 확인해주세요.");
		} else if (res.status == 201) {
			alert("등록에 성공했습니다.");
			window.location.reload();
		}
	};

	return (
		<div>
			<NavigationBar></NavigationBar>
			<div className={style.title}>상품 업로드</div>
			<form
				action=""
				className={style.formContent}
				encType="multipart/form-data"
			>
				<div className={style.formTitle}>제목</div>
				<input
					type="text"
					placeholder="제목"
					className={style.input}
					onChange={(e) => {
						setProductTitle(e.target.value);
					}}
				/>
				<div className={style.formTitle}>게시글 </div>
				<textarea
					className={style.articleContent}
					name=""
					id=""
					cols="30"
					rows="10"
					placeholder="게시글을 작성해 주세요."
					onBlur={(e) => {
						setProductArticle(e.target.value);
					}}
				></textarea>
				<div className={style.formTitle}>가격</div>
				<input
				className={style.input}
					type="number"
					placeholder="가격을 제시해 주세요."
					onChange={(e) => {
						setProductPrice(e.target.value);
						console.log(prodcutPrice);
					}}
				/>
				<div className={style.formTitle}>사진</div>

				<input
				
					type="file"
					id="imageFile"
					className={style.fileInput}
					accept="image/jpg,image/png,image/jpeg"
					onChange={handleImages}
					multiple
				/>

				<div className={style.imageDiv}>
					<label htmlFor="imageFile" className={style.label}>
						<FontAwesomeIcon
							icon={faImages}
							className={style.icon}
						/>
					</label>
					{image.length == 0 ? (
						<div className={style.imageMessage}>
							상품 소개를 위한 사진을 넣어주세요. 사진은 JPG, JPEG
							PNG 파일만 넣을 수 있습니다!(최대 10mb크기의 사진만
							가능합니다.)
						</div>
					) : (
						<></>
					)}

					<div className={style.showImageContainer}>
						{image.length >= 1 ? (
							showImages.map(
								(image, id) => (
									console.log(showImages.length),
									(
										<div
											className={style.imageContainer}
											key={id}
										>
											<img
												src={image}
												alt={`${image}-${id}`}
											/>
											{/* <Delete onClick={() => handleDeleteImage(id)} /> */}
											<FontAwesomeIcon
												icon={faCircleXmark}
												className={style.deleteImage}
												onClick={() =>
													handleDeleteImage(id)
												}
											/>
										</div>
									)
								)
							)
						) : (
							<></>
						)}
					</div>
				</div>

				<div className={style.formTitle}>태그</div>
				<input
				className={style.input}
					type="text"
					placeholder="태그는 필수 항목입니다. 그리고 띄워쓰기로 구분됩니다. 작성시 주의해 주세요."
					onChange={(e) => {
						setProductTag(e.target.value);
					}}
				/>

				<button className={style.button} onClick={submitProduct}>
					업로드 하기
				</button>
			</form>

			{/* <div className={style.formContent}>
				<form action="" encType="multipart/form-data">
					<div className={style.imageIconDiv}>
						<label for="imageChoose">
							<FontAwesomeIcon
								icon={faImages}
								className={style.imageIcon}
							/>
						</label>
						<input
							type="file"
							id="imageChoose"
							name="imageChoose"
							accept="image/jpeg*"
						/>
					</div>
					<div className={style.titleDiv}>
						<input type="text" placeholder="제목" />
					</div>
					<div className={style.tagDiv}>
						<input
							type="text"
							placeholder="태그를 작성해 주세요(10개 이하)"
						/>
					</div>
					<div className={style.priceDiv}>
						<input type="text" placeholder="가격" />
						<label for="nanum">
							<input
								type="checkbox"
								name="nanum"
								id="nanum"
								value="나눔"
							/>
							나눔
						</label>
					</div>
					<div className={style.articleDiv}>
						<textarea
							name="article"
							placeholder="게시글을 입력하세요."
						></textarea>
					</div>
					<div className={style.buttonDiv}>
						<label htmlFor="submitArticle">
						<div className={style.button}>등록하기</div>
						</label>
						<input type="submit" id="submitArticle"/>
					</div>
					
				</form>
			</div> */}
		</div>
	);
}
