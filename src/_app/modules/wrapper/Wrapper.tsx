import { useContext, useEffect, useRef } from "react";

import { STATUS } from "../../../common/constants";
import Socket from "../../../common/instances/Socket";
import { BSContext } from "../../../contexts/bottom-sheet";
import { ToastContext } from "../../../contexts/toast";


import S from './Wrapper.module.css';

import type { GFCWithProp } from "../../../common/types/fc";
import type { OrderedItemModel } from "../../../pages/admin-page/config/type";
import type { MenuPageModel } from "../../../pages/menu-page/config/type";
import type { ReactNode , MutableRefObject } from "react";


type ShopInfo = MenuPageModel['shop'];


interface Props { children: ReactNode; }

// NEEDED TO USE CONTEXTS
const Wrapper: GFCWithProp<Props> = ({ connector, children }) => {
    const { bSElement } = useContext(BSContext);
    const { setToastItem } = useContext(ToastContext);
    const socket: MutableRefObject<Socket|null> = useRef(null);
    
    useEffect(() => {
        if (connector.current?.getIsAdmin()) return;
    
        if (!socket.current) socket.current = new Socket();
    
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
    }, [connector]);
	
    return (
        <div className={
            bSElement ? S['BS-on'] : ''
        }>{children}</div>
    );
};

export default Wrapper;
