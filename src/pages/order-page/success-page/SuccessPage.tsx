import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getQueryStrings } from "../../../common/utils/query";
import ExitButton from "../module/ExitButton";

import type { OrderApprovePostModel } from "./config/type";
import type { GFC } from "../../../common/types/fc";


const SuccessPage: GFC = ({ connector }) => {
    const location = useLocation();
    
    useEffect(() => {
        console.log('approve');
        void (async () => {
            try {
                await connector.current?.post<OrderApprovePostModel>('/order/approve', {
                    pg_token: getQueryStrings(location.search, 'pg_token'),
                    payment_id: localStorage.getItem('payment_id'),
                });
            } catch (e) {
                alert("결제에 실패하였습니다");
                console.error(e);
            } finally {
                localStorage.removeItem('payment_id');
            }
        })();
    }, [location]);
    
    
    return (
        <div>
            <ExitButton text="결제가 완료되었습니다."/>
        </div>
    );
};

export default SuccessPage;
