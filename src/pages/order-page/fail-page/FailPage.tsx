import { useEffect } from "react";

import ExitButton from "../module/ExitButton";

const FailPage = () => {
    useEffect(() => {
        localStorage.removeItem('payment_id');
    }, []);
    
    return (
        <div>
            <ExitButton text="결제가 실패했습니다."/>
        </div>
    );
};

export default FailPage;
