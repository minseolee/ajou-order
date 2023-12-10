import { useEffect, useState } from "react";

import { ALERT } from "../../../../common/constants";
import { moneyFormatter } from "../../../../common/utils/fomat";

import S from "./OrderBox.module.css";

import type Connector from "../../../../common/instances/Connector";
import type { MenuPageData } from "../../../menu-page/config/type";
import type { HistoryPageData } from "../../config/type";
import type { FC , MutableRefObject } from "react";

interface Props {
    shop : string;
    items : HistoryPageData['items'];
    waitingCount : HistoryPageData['waitingCount'];
    price : HistoryPageData['totalPrice'];
    takeout : HistoryPageData['takeout'];
    status : HistoryPageData['status'];
    connector : MutableRefObject<Connector | null>;
}

const OrderBox : FC<Props> = ({ shop, items, waitingCount, price, takeout, status, connector }) => {
    const [_name, setName] = useState<string>('');

    useEffect(() => {
        if (!connector) return;
        void (async () => {
            try{
                const response = await connector.current!.get<MenuPageData>(`/menu/${items[0].menuId}`);
                setName(response.name);
            } catch {
                alert(ALERT.REQ_FAIL);
            }
        })();
    }, []);

    const title = () => {
        let quantity = 0;
        items?.forEach((d) => {
            quantity += d.quantity;
        });
        return`${_name} 포함 ${quantity}개`;
    };

    const setStatus = () => {
        switch (status) {
        case 'Pending':
            return '주문 대기중';
        case 'Preparing':
            return '상품 준비중';
        case 'Ready':
            return '수령 대기중';
        case 'Completed':
            return '수령 완료';
        }
    };
    const _status = setStatus();

    return (
        <div className={S['container']}>
            <span className={S['number']}>{waitingCount}</span>
            <div className={S['text-box']}>
                <span className={S['title']}>{title()}</span>
                <span>{shop}</span>
                <span className={S['pickup']}>{takeout ? '포장' : '매장'}</span>
                <span>{_status}</span>
            </div>
            <span className={S['price']}>{moneyFormatter(price)}</span>
        </div>
    );
};

export default OrderBox;
