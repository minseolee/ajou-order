import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { BSContext } from "../../contexts/bottom-sheet";

import S from './BottomSheet.module.css';

import type { FC } from "react";

const BottomSheet: FC = () => {
    const { bSElement, flushBSElement } = useContext(BSContext);
    const [retEl, setRetEl] = useState(<></>);
    const location = useLocation();
    
    useEffect(() => {
        flushBSElement();
    }, [location]);
    
    useEffect(() => {
        if (bSElement) setRetEl(
            <div className={S['container']}>
                <p className={S['close-btn']}
                    onClick={flushBSElement}
                >x</p>
                {bSElement}
            </div>
        );
        else setRetEl(<></>);
    }, [bSElement]);
    
    return retEl;
};

export default BottomSheet;
