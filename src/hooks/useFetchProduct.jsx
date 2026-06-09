import { useState, useEffect } from 'react'

function useFetchProduct(productId) {
    console.log("useFetchProduct - productId : ", productId);

    const [product, setProduct] = useState(null);
    const [isProductLoading, setIsProductLoading] = useState(true);
    const [isProductError, setIsProductError] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            try {
                setIsProductLoading(true);

                // 현재 도메인 가져오기 (예: example.com)
                const domain = window.location.hostname;
                // console.log("domain : ", domain);

                var response = null;
                var json = null;

                


                if(domain != "localhost") {
                    response = await fetch("https://time7064.github.io/e_commerce_new/db.json");

                    json = await response.json();
                    json = json.products;

                    console.log("[reviews json.products] \n", json);

                    // TODO: URL 주소로 data 못찾음.. 필터링으로..
                    var json2 = json.filter(value  => value.id === productId);
                    // var json2 = json.filter(value  => value.id == String(productId));


                    console.log("[reviews json2] \n", json2);

                    json = json2;
                }   
                else {
                    response = await fetch("http://localhost:3000/products/" + productId);

                    json = await response.json();
                    console.log("[productId json] \n", json);
                }




                if(!response.ok) {
                    throw new Error();
                }

                setProduct(json);

                setIsProductLoading(false);
            } catch {
                setIsProductError(true);
                setIsProductLoading(false);
                
            }
        }

        fetchProduct();
        
    }, [productId])  // 리로딩시 파라미터 productId 변수가 초기화 [] 되기때문에 외부 변수 사용시 여기에 입력

    return {
        product,
        isProductLoading,
        isProductError,
    };
}

export default useFetchProduct;