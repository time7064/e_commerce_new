import { Outlet, Link } from 'react-router';

import styles from './Layout.module.css';

const Layout = () => {
    return (
        <div className={ styles.container} >
            <Link to="/" className={ styles.link}>
                <h1>CSY_mall</h1>
            </Link>

            {/*             
            <ul>
                <li>
                    <Link to="/">홈 페이지</Link>
                </li>
                <li>
                    <Link to="/about">어바웃</Link>
                </li>
                <li>
                    <Link to="/products/11">프로덕트 동적 URL</Link>
                </li>
            </ul>  
            */}

            <Outlet></Outlet>
        </div>
    );
    
};

export default Layout;