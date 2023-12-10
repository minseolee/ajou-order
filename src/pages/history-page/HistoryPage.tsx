import { useEffect, useState } from "react";

import { ALERT } from "../../common/constants";

import OrderBox from "./modules/order-box/OrderBox";

import type { HistoryPageModel } from "./config/type";
import type { GFC } from "../../common/types/fc";



const HistoryPage: GFC = ({ connector }) => {
    const [model, setModel] = useState<HistoryPageModel|null>(null);
    
    useEffect(() => {
        if (!connector.current) return;
        
        void (async () => {
            try {
                const response = await connector.current!.get<HistoryPageModel>('/order');
                setModel(response);
            } catch {
                alert(ALERT.REQ_FAIL);
            }
        })();
    }, []);

    return (
        <div>
            {
                model && model.map((d, i) => (
                    <OrderBox waitingCount={d.waitingCount} items={d.items} 
                        price={d.totalPrice} status={d.status} shop={d.shop.name}
                        takeout={d.takeout} key={`orderbox-${i}`} connector={connector}
                    />
                ))
            }
        </div>
    );
};

export default HistoryPage;
