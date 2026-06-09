import { useState, useEffect } from 'react'

function useFetchReviews(productId) {
    console.log("useFetchReviews - productId : ", productId);

    const [reviews, setReviews] = useState([]);
    const [isReviewsLoading, setIsReviewsLoading] = useState(true);
    const [isReviewsError, setIsReviewsError] = useState(false);

    useEffect(() => {
        async function fetchReviews() {
            try {
                setIsReviewsLoading(true);

                console.log("useFetchReviews2 - productId : ", productId);


                // 현재 도메인 가져오기 (예: example.com)
                const domain = window.location.hostname;
                // console.log("domain : ", domain);


                // TODO: URL 주소로 data 못찾음.. 필터링으로..
                // const response = await fetch("http://localhost:3000/reviews?productId=" + productId);
                // const response = await fetch('http://localhost:3000/reviews?productId=${productId}');
                
                // const response = await fetch("http://localhost:3000/reviews");


                var response = null;
                var json = null;


                if(domain != "localhost") {
                    response = await fetch("https://time7064.github.io/e_commerce_new/db.json");

                    json = await response.json();
                    json = json.products;

                    console.log("[reviews json.products] \n", json);
                }   
                else {
                    response = await fetch("http://localhost:3000/reviews");

                    json = await response.json();
                    console.log("[reviews json] \n", json);
                }
                
                // TODO: URL 주소로 data 못찾음.. 필터링으로..
                const json2 = json.filter(value  => value.productId === productId);
                console.log("[reviews json2] \n", json2);

                if(!response.ok) {
                    throw new Error();
                }

                // TODO: URL 주소로 data 못찾음.. 필터링으로..
                // setReviews(json);
                setReviews(json2);

                setIsReviewsLoading(false);
            } catch {
                setIsReviewsError(true);
                setIsReviewsLoading(false);
                
            }
        }

        fetchReviews();
        
    }, [productId])  // 리로딩시 파라미터 productId 변수가 초기화 [] 되기때문에 외부 변수 사용시 여기에 입력


    return {
        reviews,
        isReviewsLoading,
        isReviewsError,
    };

}

export default useFetchReviews;