import { useState } from "react";
import { Link } from "react-router";

import styles from "./Home.module.css";

import useFetchProducts from "../../hooks/useFetchProducts";

const Home = () => {
    const { products, isProductsLoading, isProductsError } = useFetchProducts();  // hook (fetch 통신) 
    const [ selectedCategory, setSelectedCategory ] = useState("전체");           // 필터링 - 전체

    // 필터 함수
    const filteredProducts = products.filter(( {category} ) => {
        if(selectedCategory === "전체") {
            return true;
        }

        return selectedCategory === category;
    });

    if(isProductsLoading) {
        // return <div>Loading..</div>;
        return <div>상품을 로딩 중입니다.</div>;
    }

    if(isProductsError) {
        // return <div>Error</div>;
        return <div>상품 목록을 가져오는 중에 오류가 발생했습니다.</div>;
    }

    return (
        <>
            {/*             
            <ul className={styles.categoryList}>
                <li className={styles.selected}>전체</li>
                <li>상의</li>
                <li>하의</li>
                <li>신발</li>
                <li>가방</li>
                <li>악세서리</li>
            </ul> 
             */}

            <ul className={styles.categoryList}>
                {
                    ["전체", "상의", "하의", "가방", "악세서리"].map(
                        (category) => {
                        return(
                            <li
                            key={category}
                            className={
                                selectedCategory === category ? styles.selected : null
                            } 
                            onClick={() => {
                                setSelectedCategory(category);
                                console.log("category : ", category);
                            }}
                            >
                                {category}
                            </li>

                        );
                    })
                }
            </ul>



            {/* <h3>상품 목록(20)</h3> */}
            <h3>상품 목록( {filteredProducts.length} )</h3>

            <div className={styles.productList}>
            
                
                    {
                        // products.map(( {id, category, image, name, price } ) => {
                        filteredProducts.map(( {id, category, image, name, price } ) => {   // 필터함수 사용 products.map -> filteredProducts.map()

                            // console.log(product);

                            return (
                            <Link 
                            key={id} 

                            /* vite.config.js 파일 base:"/e_commerce_new",  서버 배포 관련 추가 */
                            // to={'/products/' + id} 
                            to={'/e_commerce_new/products/' + id} 
                            
                            className={styles.productItem}
                            >
                                <img src={image} />
                                <div className={styles.productInfo}>
                        <           div className={styles.productCategory}>{category}</div>
                                    <div className={styles.productName}>{name}</div>

                                    {/* 천단위 표기 수정  {price}  =>  {price.toLocaleString()} */}
                                    {/* <div className={styles.productPrice}>{price}원</div> */}
                                    <div className={styles.productPrice}>{price.toLocaleString()}원</div>  
                                </div>
                            
                             </Link>
                            );
                        })
                    }

                {/*                     
                <div className={styles.productItem}>    
                    <img src="https://picsum.photos/200" />
                    <div className={styles.productInfo}>
                        <div className={styles.productCategory}>상의</div>
                        <div className={styles.productName}>멋진 니트</div>
                        <div className={styles.productPrice}>19,000원</div>
                    </div>
                </div> 
                */}

            </div>

        </>
    );
};

export default Home;