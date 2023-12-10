import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import APP_ROUTE from "../../_app/config/route";
import { CartContext } from "../../contexts/cart";

import S from './Header.module.css';

import type { GFC, GFCWithProp } from "../../common/types/fc";
import type { JSX } from "react";


const Icons: GFC = ({ connector }) => {
    const { cartItem, getCartItemQuantity } = useContext(CartContext);
    
    const handleLogOut = () => {
        if (confirm("로그아웃 하시겠습니까?")) {
            connector.current?.logout();
        }
    };
    
    return (
        <div className={'flex gap-4'}>
            <span onClick={handleLogOut} className={'cursor-pointer'}>🚀</span>
            <Link to={APP_ROUTE.HISTORY}>
                <span>🔔</span>
            </Link>
            <Link to={APP_ROUTE.CART}>
                <span>🛍</span>
                {
                    cartItem && <span className={S['menu-length']}>{getCartItemQuantity()}</span>
                }
            </Link>
        </div>
    );
};

const CartHeader = () => {
    return (
        <div className={S['cart']}>
            <Link to={'/'}>
                <span>&lt;</span>
            </Link>
            <span className={'bold flex justify-center items-center'}>장바구니</span>
            <div />
        </div>
    );
};

const HomeHeader: GFC = ({ connector }) => {
    return (
        <div className={S['home']}>
            <span className={'bold'}>AJOUORDER</span>
            <Icons connector={connector} />
        </div>
    );
};

const HistoryHeader = () => {
    return (
        <div className={S['history']}>
            <Link to={'/'}>
                <span>&lt;</span>
            </Link>
            <span className={'bold flex justify-center items-center'}>주문알림</span>
            <div />
        </div>
    );
};

const AdminHeader: GFC = ({ connector }) => {
    const handleLogOut = () => {
        if (confirm("로그아웃 하시겠습니까?")) {
            connector.current?.logout();
        }
    };
    
    return (
        <div className={S['admin']}>
            <span className={'bold'}>AJOUORDER</span>
            <span onClick={handleLogOut} className={'cursor-pointer'}>🚀</span>
        </div>
    );
};

interface MenuHeaderProps { headerName: Props['headerName']; }
const MenuHeader: GFCWithProp<MenuHeaderProps> = ({ headerName, connector }) => {
    return (
        <div className={S['menu']}>
            <Link to={'/'}>
                <span>&lt;</span>
            </Link>
            <span>{headerName}</span>
            <Icons connector={connector} />
        </div>
    );
};


interface Props { headerName: string; }
const Header: GFCWithProp<Props> = ({ headerName, connector }) => {
    const location = useLocation();
    const [returnEl, setReturnEl] = useState<JSX.Element>(<></>);
    
    useEffect(() => {
        const _loc = location.pathname.split('/').at(1);
        if (_loc === '') setReturnEl(<HomeHeader connector={connector} />);
        if (_loc === 'menu') setReturnEl(<MenuHeader headerName={headerName} connector={connector} />);
        if (_loc === 'cart') setReturnEl(<CartHeader />);
        if (_loc === 'history') setReturnEl(<HistoryHeader />);
        if (_loc === 'admin') setReturnEl(<AdminHeader connector={connector} />);
    }, [location, headerName]);
    
    return (
        <header className={S['container']}>
            {returnEl}
        </header>
    );
};

export default Header;
