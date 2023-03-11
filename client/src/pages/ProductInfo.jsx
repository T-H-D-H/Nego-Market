import NavigationBar from "../components/Navigation";
import style from "./../styles/ProductInfo.module.css";
import { useState , useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight,faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';
// 상품 사진, 판매자 정보, 게시글 제목, 게시글(가격, 판매 글, 게시일(최근 수정일), 태그), 댓글
export default function UploadProduct(props) {
    const port = process.env.REACT_APP_PORT;
    const {id} =useParams();
    // 파라미터로 상품 ID 가져와야함.
    const [productimg,setImg] =useState([]);
    const [sellerinfo,setSellerInfo] =useState();
    // 상품에 저장된 seller의 Id를 사용한 정보를 저장
    const [sellerId,setSellerId] =useState();
    // seller의ID를 저장하는 state
    const [articleTitle,setTitle] =useState();
    const [productLike,setLike] =useState();
    // 로그인한 사용자의 like 표시
    const [productPrice,setPrice]=useState();
    const [article,setArticle] =useState();
    const [tags,setTags] =useState([]);
    const [comments,setComments]=useState([]);
    // 상품의 Id로 가져올 댓글들을 저장

    useEffect(() => {
        loadData()
	}, []);

    const loadData = async()=>{
        const token = JSON.parse(sessionStorage.getItem("token"));
        const productData = await fetch(port+"/api/product/"+id,{
            method: "GET",
			headers: {
				"Content-Type": "application/json",
                Authorization: "Bearer "+token,
			},
        });

        const result = await productData.json();
        setImg(result.img);
        setTitle(result.title);
        setArticle(result.content);
        setPrice(result.price);
        setTags(result.tagName)
        console.log(result);
    }
    

    const Pictures =()=>{
        const [currentIndex, setCurrentIndex] = useState(0);

        const handlePrevClick = () => {
            setCurrentIndex((currentIndex - 1 + productimg.length) % productimg.length);
          };
        
          const handleNextClick = () => {
            setCurrentIndex((currentIndex + 1) % productimg.length);
          };
        return (
            <div className={style.picDiv}>
            <FontAwesomeIcon icon={faArrowLeft} onClick={handlePrevClick} className={style.arrowIcon}/>
            <img src={productimg[currentIndex]} alt="carousel" className={style.picImg} />
            <FontAwesomeIcon icon={faArrowRight} onClick={handleNextClick} className={style.arrowIcon}/>
          </div>
            )
    }

    const Title =()=>{
        return (
            <div>
                {articleTitle} 및 좋아요
            </div>
            )
    }

    const ProductSeller = ()=>{
        return (
            <div>
                판매자 정보
            </div>
        )
    }

    const ProductArticle = ()=>{
        return (
            <div>
                {article}
            </div>
        )
    }

    const Tags = ()=>{
        return (
            <div>
                {tags}0
            </div>
        )
    }

    const Comments = ()=>{
        return (
            <div>
                댓글
            </div>
        )
    }

    const ProductData =()=>{
        return (<div  className={style.align_main_center}>
            <Pictures />
            <ProductSeller />
            <Title/>
            <ProductArticle/>
            <Tags/>
            <Comments/>
        </div>
            
        )
    }

   
    return(
        <div>
            <NavigationBar></NavigationBar>
            <ProductData/>
        </div>
    )
}

