import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { cloneDeep } from "../../common/utils/jjLodash";
import { ToastContext } from "../../contexts/toast";

import S from './Toast.module.css';

import type { ReactNode, FC } from 'react';


// TODO:: Consider about lots of toasts. T^T
const Toast: FC = () => {
    const { toastItem, setToastItem } = useContext(ToastContext);
    const [retEl, setRetEl] = useState<ReactNode>(<></>);
    const navigator = useNavigate();
    
    const removeToast = () => {
        setRetEl(<></>);
        setToastItem(null);
    };
    
    const handleClickToast = (goto?: string) => {
        if (goto) {
            navigator(goto);
        }
        removeToast();
    };
    
    useEffect(() => {
        if (!toastItem || !Object.keys(toastItem).length) return;
        
        const _toastItem = cloneDeep(toastItem);
        
        setRetEl(
            <div key={_toastItem.id} onClick={() => handleClickToast(_toastItem.goto)}
                className={S['item']}
            >
                <h1 className={S['title']}>{_toastItem.title}</h1>
                <p>{_toastItem.description}</p>
            </div>
        );
        
        const timeoutId = setTimeout(() => removeToast(), 30000);

        return () => clearTimeout(timeoutId);
    }, [toastItem]);
    
    return (
        <div className={S['container']}>
            {retEl}
        </div>
    );
};

export default Toast;
