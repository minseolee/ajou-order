import { useState } from "react";
import { useNavigate } from "react-router-dom";

import APP_ROUTE from "../../_app/config/route";


import S from './LoginPage.module.css';

import type { LoginPagePostModel } from "./config/type";
import type { GFC } from "../../common/types/fc";


const LoginPage: GFC = ({ connector }) => {
    const [account, setAccount] = useState({
        loginId: '', password: ''
    });
    const navigate = useNavigate();
    
    const handleChangeId = (e: any) => {
        setAccount((prev) => ({
            ...prev,
            loginId: e.target.value
        }));
    };
    
    const handleChangePw = (e: any) => {
        setAccount((prev) => ({
            ...prev,
            password: e.target.value
        }));
    };
    
    const handleGotoSignup = () => {
        navigate(APP_ROUTE.SIGNUP);
    };
    const handleLogin = () => {
        if (!connector.current) return;
        
        void (async () => {
            try {
                const response = await connector.current!.login<LoginPagePostModel>(account);
                if (response.role?.isAdmin) {
                    connector.current!.setIsAdmin(true);
                    navigate(APP_ROUTE.ADMIN);
                } else {
                    connector.current!.setIsAdmin(false);
                    navigate(APP_ROUTE.MAIN);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    };
    
    return (
        <div className={S['container']}>
            <span className={'mb-4'}>아주대학교 주문서비스 <br/><b className={'bold'}>AJOU ORDER</b> 입니다</span>
            <input onChange={handleChangeId} placeholder={'아이디를 입력해주세요.'} />
            <input onChange={handleChangePw} placeholder={'비밀번호를 입력해주세요.'} type={'password'} />
            <div className={S['btn-area']}>
                <button className={S['signup-btn']} onClick={handleGotoSignup}>회원가입</button>
                <button className={S['login-btn']} onClick={handleLogin}
                >로그인</button>
            </div>
        </div>
    );
};

export default LoginPage;
