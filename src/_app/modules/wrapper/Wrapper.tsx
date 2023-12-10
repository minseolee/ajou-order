import { useContext, useEffect, useRef } from "react";

import { STATUS } from "../../../common/constants";
import UserSocket from "../../../common/instances/UserSocket";
import { BSContext } from "../../../contexts/bottom-sheet";
import { ToastContext } from "../../../contexts/toast";


import S from './Wrapper.module.css';

import type { GFCWithProp } from "../../../common/types/fc";
import type { OrderedItemModel } from "../../../pages/admin-page/config/type";
import type { MenuPageModel } from "../../../pages/menu-page/config/type";
import type { ReactNode , MutableRefObject } from "react";


type ShopInfo = MenuPageModel['shop'];


interface Props { children: ReactNode; login: boolean }

// NEEDED TO USE CONTEXTS
const Wrapper: GFCWithProp<Props> = ({ connector, children, login }) => {
    const { bSElement } = useContext(BSContext);
    const { setToastItem } = useContext(ToastContext);
    const socket: MutableRefObject<UserSocket|null> = useRef(null);
    
    
    useEffect(() => {
        if (!login) {
            socket.current?.disconnect();
            socket.current = null;
        }
    }, [login]);
    
    useEffect(() => {
        if (!socket.current) socket.current = new UserSocket();
    
        if (connector.current?.getIsAdmin()) return;
        socket.current!.onOrder(async (d: OrderedItemModel) => {
            if (d.status !== STATUS.COMPLETED) return;
            
            const shopInfo = await connector.current!.get<ShopInfo>(`/shop/${d.shopId}`);
            
            setToastItem({
                id: '',
                title: `${shopInfo.name} 주문이 준비되었습니다`,
                description: `대기번호: ${d.waitingCount}번`,
                goto: ''
            });
        });
    
        return () => {
            socket.current?.disconnect();
            socket.current = null;
        };
    }, [connector, login]);
	
    return (
        <div className={
            bSElement ? S['BS-on'] : ''
        }>{children}</div>
    );
};

export default Wrapper;
