import NavigationBar from "../components/Navigation";
import style from "./../styles/ProductInfo.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRight,
	faArrowLeft,
	faHeart,
	faArrowTurnUp
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as binHeart } from "@fortawesome/free-regular-svg-icons";
import { useParams } from "react-router-dom";
// 상품 사진, 판매자 정보, 게시글 제목, 게시글(가격, 판매 글, 게시일(최근 수정일), 태그), 댓글
export default function UploadProduct(props) {
	const port = process.env.REACT_APP_PORT;
	const { id } = useParams();
	// 파라미터로 상품 ID 가져와야함.
	const [productimg, setImg] = useState([]);
	const [sellerinfo, setSellerInfo] = useState({});
	// 상품에 저장된 seller의 Id를 사용한 정보를 저장
	const [sellerId, setSellerId] = useState();
	// seller의ID를 저장하는 state
	const [articleTitle, setTitle] = useState();
	const [productLike, setLike] = useState();
	// 로그인한 사용자의 like 표시
	const [likeBtn, setlikeBtn] = useState();
	const [productPrice, setPrice] = useState();
	const [article, setArticle] = useState();
	const [tags, setTags] = useState([]);
	const [comments, setComments] = useState([]);
	// 상품의 Id로 가져올 댓글들을 저장

	useEffect(() => {
		loadData();
		loadComments();
	}, []);

	const loadComments = async () => {
		const comments = await fetch(port + "/api/comments/" + id, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await comments.json();
		setComments(result);
	};

	const loadData = async () => {
		const token = JSON.parse(sessionStorage.getItem("token"));
		const productData = await fetch(port + "/api/product/" + id, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});

		const result = await productData.json();
		setImg(result.img);
		setTitle(result.title);
		setArticle(result.content);
		setPrice(result.price);
		setTags(result.tagName);
		setSellerInfo({
			nickname: result.nickname,
			address: result.addressName,
		});
		console.log(result);
	};

	const Pictures = () => {
		const [currentIndex, setCurrentIndex] = useState(0);

		const handlePrevClick = () => {
			setCurrentIndex(
				(currentIndex - 1 + productimg.length) % productimg.length
			);
		};

		const handleNextClick = () => {
			setCurrentIndex((currentIndex + 1) % productimg.length);
		};
		return (
			<div className={style.picDiv}>
				<FontAwesomeIcon
					icon={faArrowLeft}
					onClick={handlePrevClick}
					className={style.arrowIcon}
				/>
				<img
					src={productimg[currentIndex]}
					alt="carousel"
					className={style.picImg}
				/>
				<FontAwesomeIcon
					icon={faArrowRight}
					onClick={handleNextClick}
					className={style.arrowIcon}
				/>
			</div>
		);
	};

	const Title = () => {
		// TODO: 상품 API에서 로그인 유저의 좋아요 상태 가져옴
		const handleLike = async () => {
			const token = JSON.parse(sessionStorage.getItem("token"));
			if (productLike) {
				// 로그인한 사람이 선택한 상품의 좋아요가 사라지는 API
				setLike(false);
			} else {
				// 로그인한 사람이 선택한 상품을 좋아요에 등록하는 API
				setLike(true);
			}
			const likeData = await fetch(port + "/api/product/" + id, {
				// 로그인한 사람이 좋아요를 했는지 확인하는 API로 정보 가져오기
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
			});
			const result = await likeData.json();
		};

		return (
			<div className={style.titleDiv}>
				<span className={style.titleSpan}>{articleTitle}</span>
				{productLike ? (
					<FontAwesomeIcon
						icon={faHeart}
						className={style.heartIcon}
						onClick={handleLike}
					/>
				) : (
					<FontAwesomeIcon
						icon={binHeart}
						className={style.heartIcon}
						onClick={handleLike}
					/>
				)}
			</div>
		);
	};

	const ProductSeller = () => {
		// TODO: 상품 정보에 들어있는 판매자 아이디로 판매자 정보를 가져오는게 필요함
		

		return (
			<div className={style.sellerDiv}>
				<span className={style.sellerNickName}>
					{sellerinfo.nickname}
				</span>
				<span className={style.sellerAddress}>
					{sellerinfo.address ? (
						sellerinfo.address.si +
						" " +
						sellerinfo.address.gu +
						" " +
						sellerinfo.address.dong
					) : (
						<></>
					)}
					
				</span>
				
			</div>
		);
	};

	const ProductArticle = () => {
		return <div className={style.articleDiv}>{article}</div>;
	};

	const Tags = () => {
		const datas = tags;
		// const datas = ["태그1","태그1","태그1","태그1","태그1","태그1","태그1","태그1","태그1","태그1",]

		const TagBox = (tag) => {
			return (
				<div className={style.tagBox} key={tag}>
					#{tag}
				</div>
			);
		};
		return (
			<div className={style.tagDiv}>
				{datas.map((data) => {
					return TagBox(data);
				})}
			</div>
		);
	};

	const Comments = () => {
		const [selectedId, setSelectedId] = useState(null);
		const [newComment, setNewComment] = useState({
			productID: id,
			content: "",
		});

		const [newReply,setNewReply] =useState({
			productID:id,
			parentID:null,
			content:"",
		})

		const handleReplyChange =(e)=>{
			setNewReply({
				...newReply,
				content:e.target.value,
				parentID:selectedId
			})
		}

		const handleReplySubmit = async (event) => {
			event.preventDefault();
			console.log(newReply)
			const token = JSON.parse(sessionStorage.getItem("token"));
			if(!token){
				alert("로그인이 필요한 서비스 입니다.");
			return;}
			if (newReply.content.trim() !== "") {
				const data = JSON.stringify(newReply);
				const res = await fetch(port + "/api/reply", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
					body: data,
				})
					.then((response) => {
						if (response.ok) {
							return response.text();
						} else {
							throw new Error("Something went wrong");
						}
					})
					.then((data) => {
						console.log(data); // SUCCESS
						// 성공적으로 처리된 경우, 사용자에게 알림을 표시할 수 있습니다.
					})
					.catch((error) => {
						console.error(error);
						// 요청이 실패한 경우, 사용자에게 에러 메시지를 표시할 수 있습니다.
					});
					setNewReply({ content: "" });
			}
			loadComments();
		};

		const handleTextChange = (event) => {
			setNewComment({ ...newComment, content: event.target.value });
		};

		const handleSubmit = async (event) => {
			event.preventDefault();
			const token = JSON.parse(sessionStorage.getItem("token"));
			if(!token){
				alert("로그인이 필요한 서비스 입니다.");
			return;}
			if (newComment.content.trim() !== "") {
				const data = JSON.stringify(newComment);
				const res = await fetch(port + "/api/comment", {
					// 로그인한 사람이 좋아요를 했는지 확인하는 API로 정보 가져오기
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
					body: data,
				})
					.then((response) => {
						if (response.ok) {
							return response.text();
						} else {
							throw new Error("Something went wrong");
						}
					})
					.then((data) => {
						console.log(data); // SUCCESS
						// 성공적으로 처리된 경우, 사용자에게 알림을 표시할 수 있습니다.
					})
					.catch((error) => {
						console.error(error);
						// 요청이 실패한 경우, 사용자에게 에러 메시지를 표시할 수 있습니다.
					});
				setNewComment({ content: "" });
			}
			loadComments();
		};

		
		const showReply = (id) => {
			console.log("show Reply 동작")
			setSelectedId(id);
		};

		const Replies = (props) => {
			const data = props.data;
			const pId = props.id;
			return (<>
			<div className={style.reply} style={{ marginLeft: "10px" }}>
					<span className={style.comment_author}>
					<FontAwesomeIcon icon={faArrowTurnUp} className={style.enterArrow} />
					{ data.nickname}
					</span>
					<span className={style.comment_text}>{data.comment}</span>
				</div>
			</>
				
			);
		};

		return (
			<div className={style.commentssDiv}>
				<span className={style.textSize}>댓글</span>
				<div className={style.comments}>
					{comments.map((comment) => (
						<div key={comment.id} className={style.comment}>
							<span className={style.comment_author}>
								{comment.nickname}
							</span>
							<span className={style.comment_text}>
								{comment.comment}
							</span>
							{comment.child_comment.map((data) => {
								return (
									<Replies
										id={comment.id}
										data={data}
										key={data.id}
									/>
								);
							})}
								<form
								onSubmit={handleReplySubmit}
								className={style.comment_form}
								style={{display: selectedId==comment.id?"flex":"none"}}
							>
								<textarea
									placeholder="Comment..."
									value={newReply.content}
									onChange={handleReplyChange}
								/>
								<button type="submit">댓글 달기</button>
							</form>
							
							<span
								className={style.commentAnswer}
								style={{display: selectedId==comment.id?"none":""}}
								onClick={(e) => {
									showReply(comment.id);
								}}
							>
								답글 달기
							</span>
						</div>
					))}
					<form
						onSubmit={handleSubmit}
						className={style.comment_form}
						display={{display:selectedId==null?"none":""}}
					>
						<textarea
							placeholder="Comment..."
							value={newComment.content}
							onChange={handleTextChange}
						/>
						<button type="submit">댓글 달기</button>
					</form>
				</div>
			</div>
		);
	};

	const ProductData = () => {
		return (
			<div className={style.align_main_center}>
				<Pictures />
				<ProductSeller />
				<Title />
				<ProductArticle />
				<Tags />
				<Comments />
			</div>
		);
	};

	return (
		<div>
			<NavigationBar></NavigationBar>
			<ProductData />
		</div>
	);
}
