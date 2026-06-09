import { useState, useEffect } from 'react'

function useFetchProducts() {

    const [products, setProducts] = useState([]);
    const [isProductsLoading, setIsProductsLoading] = useState(true);
    const [isProductsError, setIsProductsError] = useState(false);


    useEffect(() => {
        async function fetchProducts() {
            try {
                setIsProductsLoading(true);

                
                // 현재 도메인 가져오기 (예: example.com)
                const domain = window.location.hostname;
                console.log("domain : ", domain);

                // 포트 번호를 포함한 호스트 가져오기 (예: localhost:3000)
                const host = window.location.host;
                // console.log("host : ", host);

                // 프로토콜(http/https)을 포함한 전체 URL 가져오기
                const href = window.location.href;
                // console.log("href : ", href);
                
                

                var response = null;

                var vURL = null;

                 var json = null;

                if(domain != "localhost") {
                    console.log("domain != localhost ===== 01 ");

                    vURL = "https://time7064.github.io/e_commerce_new/db.json";
                    console.log("vURL : ", vURL);

                    response = await fetch(vURL);
                    json = await response.json();

                    json = json.products;
                    console.log("localhost X - [json.products] ", json);
                }
                else {
                    vURL = "http://localhost:3000/products";  // json 서버 기동시 사용..
                    console.log("vURL : ", vURL);

                    response = await fetch(vURL);

                    json = await response.json();

                    console.log("localhost [json] ", json);
                }
                
                

                if(!response.ok) {
                    throw new Error();
                }

                setProducts(json);

                setIsProductsLoading(false);
            } catch {
                setIsProductsError(true);
                setIsProductsLoading(false);
                
            }
        }

        fetchProducts();

    }, [])

    return {
        products,
        isProductsLoading,
        isProductsError,
    };
}

export default useFetchProducts;