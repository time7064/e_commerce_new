import { useParams } from "react-router";

import styles from "./ProductDetail.module.css";
import useFetchProduct from "../../hooks/useFetchProduct";
import useFetchReviews from "../../hooks/useFetchReviews";

const ProductDetail = () => {
    /*
    const param = useParams();
    console.log("param : ", param);

    return <div>Product Detail : {param.productId} </div>;
    */

    // 구조분해 할당 수정
    /*
    const { productId } = useParams();
    console.log("param : ", productId);

    return <div>Product Detail : {productId} </div>;
    */

    // 주소 파라미터 
    const { productId } = useParams();
    console.log("productId : ", productId);

    // hook 구조분해할당
    const { product, isProductLoading, isProductError } = useFetchProduct(productId);

    const { reviews, isReviewsLoading, isReviewsError } = useFetchReviews(productId);

    // TODO : 2번 로딩..오류로 인해 추가.. 추후 확인 필요
    if(product == null) {
        console.log("product == null ------------------------------");
        return;
    }
    
    console.log("index - ", product);
    console.log("index category - ", product.category);


    


    if(isProductLoading || isReviewsLoading) {
        // return <div>Loading..</div>;
        return <div>상품 정보를 불러오고 있습니다..</div>;
    }

    if(isProductError || isReviewsError) {
        // return <div>Error</div>;
        return <div>상품 정보를 불러오는 중에 오류가 발생했습니다..</div>;
    }

    return(
        <div>
            <div className={styles.productContainer}>
                <img src={product.image} />
                <div className={styles.productInfo}>
                    <div className={styles.productCategory}>{product.category}</div>
                    <h2>{product.name}</h2>
                    <div className={styles.productPrice}>{product.price.toLocaleString()}원</div>
                    <button>구매하기</button>
                </div>
            </div>

            {/* 라인 생성 */}
            <hr />

            <p className={styles.productDesc}>
                {product.description}
            </p>

            <h3>리뷰({reviews.length})</h3>
            <hr />


            {reviews.length > 0 ? (

                reviews.map((review) => {
                    return(

                        <div key={review.id} className={styles.reviewItem}>
                            <div className={styles.reviewHearder}>
                                <div>{review.username}</div>
                                <div>({review.rating}/5)</div>
                        </div>
                        <div className={styles.text}>
                            {review.text}
                        </div>
                    </div> 

                    );
                })

            ) : <div className={styles.empyReview}>리뷰가 없습니다.</div> }
           
            {/* 
            <div className={styles.reviewItem}>
                <div className={styles.reviewHearder}>
                    <div>Alice</div>
                    <div>(4/5)</div>
                </div>
                <div>
                    너무 잘 사용하고 있습니다. 굿.. 너무 잘 사용하고 있습니다. 굿..
                </div>
            </div> 
            */}

        </div>
    );
};

export default ProductDetail;