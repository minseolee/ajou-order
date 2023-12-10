import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import APP_ROUTE from "../../_app/config/route";
import { ALERT, STATUS } from "../../common/constants";
import AdminSocket from "../../common/instances/AdminSocket";

import S from './AdminPage.module.css';
import AdminOrderBox from "./modules/admin-order-box/AdminOrderBox";

import type { OrderedItemModel } from "./config/type";
import type {GFC, GFCWithProp} from "../../common/types/fc";


interface Props {
    login: boolean;
}
const AdminPage: GFCWithProp<Props> = ({ connector, login }) => {
    const navigator = useNavigate();
    let adminSocket: AdminSocket|null = null;
    const [orderList, setOrderList] = useState<Array<OrderedItemModel>>([]);
    
    
    useEffect(() => {
        if (!login) {
            adminSocket?.disconnect();
            adminSocket = null;
        }
    }, [login]);
    
    useEffect(() => {
        if (!connector.current?.getIsAdmin()) {
            alert(ALERT.REQ_WRONG);
            navigator(APP_ROUTE.LOGIN);
            return;
        }
        
        if (!adminSocket) adminSocket = new AdminSocket();
        
        adminSocket.onOrder((e) => {
            setOrderList((prev) => {
                let sortedArray = [...prev];
                sortedArray.push(e);
        
                const idStatusMap = new Map();
                sortedArray.forEach(item => {
                    if (item.status === STATUS.COMPLETED) {
                        idStatusMap.set(item._id, true);
                    } else if (!idStatusMap.has(item._id)) {
                        idStatusMap.set(item._id, false);
                    }
                });
        
                sortedArray = sortedArray.filter(item => {
                    return item.status === STATUS.COMPLETED || !idStatusMap.get(item._id);
                });
        
                sortedArray.sort((a, b) => {
                    if (a.status === STATUS.COMPLETED && b.status !== STATUS.COMPLETED) {
                        return 1;
                    } else if (b.status === STATUS.COMPLETED && a.status !== STATUS.COMPLETED) {
                        return -1;
                    }
                    return 0;
                });
                
                return sortedArray;
            });
        });
        
        return () => {
            adminSocket!.disconnect();
            adminSocket = null;
        };
    }, [connector]);
    
    return (
        <div className={S['container']}>
            {
                orderList.length ? orderList.map((d, i) => {
                    return (
                        <AdminOrderBox connector={connector} items={d.items}
                            waitingCount={d.waitingCount} takeout={d.takeout}
                            createdTime={d.createdTime} status={d.status}
                            _id={d._id} key={`aob-c1-${i}`}
                        />
                    );
                })
                    : <p>대기중인 주문이 없습니다</p>
            }
        </div>
    );
};

export default AdminPage;
