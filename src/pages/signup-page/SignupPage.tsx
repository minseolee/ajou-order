import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import APP_ROUTE from "../../_app/config/route";


import S from './SignupPage.module.css';

import type { GFC } from "../../common/types/fc";


const SignupPage: GFC = ({ connector }) => {
    const navigate = useNavigate();
    const [accountData, setAccountData] = useState({
        loginId: '',
        name: '',
        password: '',
        email: '',
        phone: ''
    });
    const [passwordAgain, setPasswordAgain] = useState<string>('');
    const Correct = () => {
        const empty = accountData.password === '';
        const same = accountData.password === passwordAgain;
        if (empty) {
            return null;
        }
        return(
            <div>
                <span className={S[same ? 'password-same' : 'password-unsame']}>
                    {same ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
                </span>
            </div>
        );
    };
    

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountData((prev) => ({
            ...prev,
            name : event.target.value
        }));
    };
    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountData((prev) => ({
            ...prev,
            loginId : event.target.value
        }));
    };
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountData((prev) => ({
            ...prev,
            email : event.target.value
        }));
    };
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountData((prev) => ({
            ...prev,
            phone : event.target.value
        }));
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountData((prev) => ({
            ...prev,
            password : event.target.value
        }));
    };
    const handlePasswordAgainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordAgain(() => (event.target.value));
    };

    const handleSignup = () => {
        if (!connector.current) return;
        
        if (
            accountData.loginId !== '' &&
            accountData.name !== '' &&
            accountData.email !== '' &&
            accountData.phone !== '' &&
            accountData.password !== '' &&
            passwordAgain !== ''
        ) {
            try {
                void(async () => {
                    await connector.current!.post('/user/register', accountData);
                    navigate(APP_ROUTE.LOGIN);
                })();
            } catch (e) {
                console.error(e);
            }
        }
        else {
            alert('모든 정보를 입력해주세요');
        }
        
    };

    return (
        <div className={S['container']}>
            <input placeholder={'이름'} onChange={handleNameChange}/>
            <input placeholder={'아이디'} onChange={handleIdChange}/>
            <input placeholder={'이메일'} onChange={handleEmailChange}/>
            <input placeholder={'전화번호'} onChange={handlePhoneChange}/>
            <input
                placeholder={'비밀번호를 입력해주세요.'}
                value={accountData.password}
                onChange={handlePasswordChange}
                type={'password'}
            />
            <input
                placeholder={'비밀번호를 한번 더 입력해주세요.'}
                value={passwordAgain}
                onChange={handlePasswordAgainChange}
                type={'password'}
            />
            <Correct />
            <div className={S['btn-area']}>
                <button className={S['signup-btn']} onClick={handleSignup}>회원가입</button>
            </div>
        </div>
    );
};

export default SignupPage;
