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
                
                

            

                var vURL = "http://localhost:3000/products";  // json 서버 기동시 사용..

                if(domain != "localhost") {
                    vURL = "https://time7064.github.io/e_commerce_new/db.json";
                }

                console.log("vURL : ", vURL);
                
                const response = await fetch(vURL);
                

                // const json = await response.json();
                var json = await response.json();
                console.log(json);

                if(domain != "localhost") {
                    console.log("[json.products] ", json.products);

                    json = json.products;
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