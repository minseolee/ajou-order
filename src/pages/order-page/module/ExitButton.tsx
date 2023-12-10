import { useNavigate } from "react-router-dom";

import APP_ROUTE from "../../../_app/config/route";

import S from './ExitButton.module.css';

import type { FC } from "react";

interface Props {
    text: string;
}

const ExitButton: FC<Props> = ({ text }) => {
    const navigate = useNavigate();

    const handleGotoMain = () => {
        navigate(APP_ROUTE.MAIN);
    };

    const handleGotoHistory = () => {
        navigate(APP_ROUTE.HISTORY);
    };
    
    
    return (
        <div className={S['container']} >
            <span className={S['text']}>{text}</span>
            <div className={S['btn-area']}>
                <button className={S['btn']} onClick={handleGotoMain}>홈 화면으로</button>
                <button className={S['btn']} onClick={handleGotoHistory}>주문 내역으로</button>
            </div>
        </div>
    );
};

export default ExitButton;
