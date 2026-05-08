import { Routes, Route, Link } from 'react-router'

import Home from './components/Home'
import ProductDetail from './components/ProductDetail'
import NotFound from './components/NotFound'

import Layout from './components/Layout'  // #01 추가 - Layout 디자인 생성

function App() {
  
  return (
    // <div>Hello, E commerce</div>

    <>

     
      <Routes>
        
        <Route element={ <Layout /> }  >          {/* #02 추가 - Layout 디자인 생성 */}
          {/* 아래 하위 Route 들이 index.jsx 파일의 <Outlet></Outlet> 로 들어감 */}

          <Route path="/" element={ <Home /> }  />
          
          <Route path="/products/:productId" element={ <ProductDetail /> }  />

          {/* Route 는 위에서 아래로 path 를 찾음.. 없으면 * path 로 NotFound 호출 */}
          <Route path="*" element={ <NotFound /> }  />  

        </Route>
      </Routes>

    </>
  )
}

export default App
