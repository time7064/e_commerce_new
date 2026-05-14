import { useState, useEffect } from 'react'

function useFetchProducts() {

    const [products, setProducts] = useState([]);
    const [isProductsLoading, setIsProductsLoading] = useState(true);
    const [isProductsError, setIsProductsError] = useState(false);


    useEffect(() => {
        async function fetchProducts() {
            try {
                setIsProductsLoading(true);

                // TODO : 서버 배포 휴대폰 접속 문제 해결 ...............................................
                /*
                // 현재 도메인 가져오기 (예: example.com)
                const domain = window.location.hostname;
                // 포트 번호를 포함한 호스트 가져오기 (예: localhost:3000)
                const host = window.location.host;
                // 프로토콜(http/https)을 포함한 전체 URL 가져오기
                const href = window.location.href;
                console.log("domain : ", domain);
                console.log("host : ", host);
                console.log("href : ", href);

                const URL = href + "products";
                console.log("URL : ", URL);

                var vURL = "http://localhost:3000/products";

                if(domain != "localhost") {
                    // vURL = "https://time7064.github.io/e_commerce_new/products"
                    // vURL = "https://time7064.github.io/products"
                    // vURL = "http://localhost/products";
                    vURL = "http://localhost:3000/products";
                }

                console.log("* vURL : ", vURL);
                
                const response = await fetch(vURL);
                */

                const response = await fetch("http://localhost:3000/products");
                
                // ......................................................................................

                const json = await response.json();
                console.log(json);

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