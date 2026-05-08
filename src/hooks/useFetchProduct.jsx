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

                const response = await fetch("http://localhost:3000/products/" + productId);
                const json = await response.json();
                console.log("[productId json] \n", json);

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