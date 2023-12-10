import { useEffect, useRef, useState } from 'react';
import '../common/css/common.css';
import '../common/css/reset.css';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { ALERT } from "../common/constants";
import Connector from "../common/instances/Connector";
import BottomSheet from "../components/bottom-sheet/BottomSheet";
import Header from "../components/header/Header";
import Toast from "../components/toast/Toast";
import { BSProvider } from "../contexts/bottom-sheet";
import { CartProvider } from "../contexts/cart";
import { ToastProvider } from "../contexts/toast";
import AdminPage from "../pages/admin-page/AdminPage";
import CartPage from "../pages/cart-page/CartPage";
import HistoryPage from "../pages/history-page/HistoryPage";
import LoginPage from "../pages/login-page/LoginPage";
import MainPage from "../pages/main-page/MainPage";
import MenuPage from "../pages/menu-page/MenuPage";
import CancelPage from "../pages/order-page/cancel-page/CancelPage";
import FailPage from "../pages/order-page/fail-page/FailPage";
import SuccessPage from "../pages/order-page/success-page/SuccessPage";
import SignupPage from "../pages/signup-page/SignupPage";

import S from './App.module.css';
import APP_ROUTE from "./config/route";
import Wrapper from "./modules/wrapper/Wrapper";

import type { MutableRefObject } from 'react';


function App() {
    const [headerName, setHeaderName] = useState('');
    const [login, setLogin] = useState(true);
    
    const connector: MutableRefObject<Connector|null> = useRef(null);
    const navigator = useNavigate();
    const location = useLocation();
    
    
    useEffect(() => {
        if (!connector.current) connector.current = new Connector(setLogin);
    }, []);
    
    useEffect(() => {
        if (!login) {
            navigator(APP_ROUTE.LOGIN);
            return;
        }
    }, [login]);
    
    useEffect(() => {
        if (!connector.current || !login) return;
        
        if (connector.current?.getIsAdmin()) {
            if (location.pathname.split('/').at(1) !== 'admin') {
                alert(ALERT.REQ_WRONG);
                navigator(APP_ROUTE.ADMIN);
            }
        }
    }, [location]);
    
    return (
        <BSProvider>
            <ToastProvider>
                <CartProvider>
                    <Toast />
                    <div className={"App"}>
                        <Wrapper connector={connector} login={login}>
                            {
                                login && <Header headerName={headerName} connector={connector} />
                            }
                            <article className={S['page-container']}>
                                <Routes>
                                    <Route path={APP_ROUTE.LOGIN} element={<LoginPage connector={connector} />} />
                                    <Route path={APP_ROUTE.SIGNUP} element={<SignupPage connector={connector} />} />
                                    <Route path={APP_ROUTE.MAIN} element={<MainPage connector={connector} />} />
                                    <Route path={APP_ROUTE.MENU} element={<MenuPage connector={connector} setHeaderName={setHeaderName}  />} />
                                    <Route path={APP_ROUTE.CART} element={<CartPage connector={connector} />} />
                                    <Route path={APP_ROUTE.HISTORY} element={<HistoryPage connector={connector} />} />
                                    <Route path={APP_ROUTE.ORDER.SUCCESS} element={<SuccessPage connector={connector} />} />
                                    <Route path={APP_ROUTE.ORDER.FAIL} element={<FailPage />} />
                                    <Route path={APP_ROUTE.ORDER.CANCEL} element={<CancelPage />} />
                                    <Route path={APP_ROUTE.ADMIN} element={<AdminPage connector={connector} />} />
                                </Routes>
                            </article>
                        </Wrapper>
                    </div>
                    <BottomSheet />
                </CartProvider>
            </ToastProvider>
        </BSProvider>
    );
}

export default App;
