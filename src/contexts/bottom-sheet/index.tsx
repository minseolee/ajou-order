import React, { createContext, useEffect, useState } from "react";

import logger from "../../common/utils/logger";

import type { FC, ReactNode, JSX } from "react";

interface BSContextType {
	bSElement: ReactNode;
	setBSElement: (d: ReactNode | JSX.Element | null) => void;
    flushBSElement: () => void;
}

const BSContext = createContext<BSContextType>({
    bSElement: null,
    setBSElement: (d) => { return d; },
    flushBSElement: () => {}
});

interface Props { children: ReactNode; }
const BSProvider: FC<Props> = ({ children }) => {
    const [item, setItem] = useState<BSContextType['bSElement']>(null);
	
    useEffect(() => {
        logger('GLOBAL BSProvider: ', item);
    } ,[item]);
    
    const setBSElement = (el: ReactNode | null) => {
        setItem(() => el);
    };
    
    const flushBSElement = () => {
        setItem(null);
    };
	
    return (
        <BSContext.Provider
            value={{
                bSElement: item,
                setBSElement,
                flushBSElement
            }}
        >
            { children }
        </BSContext.Provider>
    );
};

export { BSProvider, BSContext };
