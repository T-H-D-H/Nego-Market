import NavigationBar from "../components/Navigation";
import style from "./../styles/UploadProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
export default function UploadProduct() {
	return (
		<div>
			<NavigationBar></NavigationBar>
			<div className={style.formContent}>
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
			</div>
		</div>
	);
}
