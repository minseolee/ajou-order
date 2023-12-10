import { useEffect } from "react";

import ExitButton from "../module/ExitButton";

const CancelPage = () => {
    useEffect(() => {
        localStorage.removeItem('payment_id');
    }, []);
    
    return (
        <div>
            <ExitButton text="결제를 취소하셨습니다"/>
        </div>
    );
};

export default CancelPage;
