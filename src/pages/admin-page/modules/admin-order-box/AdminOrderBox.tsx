import { useEffect, useState } from "react";

import { ALERT, STATUS } from "../../../../common/constants";

import S from './AdminOrderBox.module.css';

import type Connector from "../../../../common/instances/Connector";
import type { MenuPageData } from "../../../menu-page/config/type";
import type { OrderedItemModel } from "../../config/type";
import type { FC, MutableRefObject } from "react";


interface Props {
	connector: MutableRefObject<Connector|null>;
	items: OrderedItemModel['items'];
	waitingCount: OrderedItemModel['waitingCount'];
	takeout: OrderedItemModel['takeout'];
	createdTime: OrderedItemModel['createdTime'];
	status: OrderedItemModel['status'];
	_id: OrderedItemModel['_id'];
}

const AdminOrderBox: FC<Props> = ({ connector, items, waitingCount, takeout, createdTime, status, _id }) => {
    const [itemName, setItemName] = useState<string[]>([]);
	
    const handleClickButton = (_id: string) => {
        connector.current!.patch('/admin/order', {
            orderId: _id,
            newStatus: 'Completed'
        });
    };
	
    useEffect(() => {
        void (async () => {
            try {
                const response = await Promise.allSettled(
                    items.map((d) =>
                        connector.current!.get<MenuPageData>(`/menu/${d.menuId}`)
                    )
                );
                const itemNames = response.map(r => {
                    if (r.status === 'fulfilled' && r.value.name) {
                        return r.value.name;
                    }
                    return null;
                }).filter(name => name !== null) as string[];
				
                setItemName(itemNames);
            } catch (e) {
                alert(ALERT.REQ_FAIL);
            }
        })();
    }, [items]);
	
    return (
        <div className={[S['container'], status === STATUS.COMPLETED ? 'del' : ''].join(' ')}>
            <h1>대기 번호: {waitingCount}번</h1>
            <div>
                {
                    items.map((d, i) => {
                        return (
                            <div key={`aob-c2-${i}`}>
                                <p>{itemName[i]} {d.quantity}개</p>
                            </div>
                        );
                    })
                }
            </div>
            <h2>주문 시각: {createdTime}</h2>
            <h2>포장 여부: {takeout ? '포장' : '매장'}</h2>
            {
                status !== STATUS.COMPLETED && <button onClick={() => handleClickButton(_id)}>조리 완료</button>
            }
        </div>
    );
};

export default AdminOrderBox;
