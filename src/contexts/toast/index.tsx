import { createContext, useEffect, useState } from "react";

import logger from "../../common/utils/logger";

import type { ToastData } from "../../components/toast/config";
import type { FC, ReactNode } from "react";

interface ToastContextType {
	toastItem: ToastData | null
	setToastItem: (d: ToastData | null) => void;
}

const ToastContext = createContext<ToastContextType>({
    toastItem: null,
    setToastItem: (d) => { return d; },
});

interface Props { children: ReactNode; }
const ToastProvider: FC<Props> = ({ children }) => {
    const [item, setItem] = useState<ToastContextType['toastItem']>(null);
	
	
    useEffect(() => {
        logger('GLOBAL ToastProvider: ', item);
    }, [item]);
	
	
    const setToastItem = (toastItem: ToastData | null) => {
        setItem(toastItem);
    };
	
	
    return (
        <ToastContext.Provider
            value={{
                toastItem: item,
                setToastItem,
            }}
        >
            { children }
        </ToastContext.Provider>
    );
};

export { ToastProvider, ToastContext };
