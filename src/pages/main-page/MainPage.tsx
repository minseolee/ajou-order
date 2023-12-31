import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import APP_ROUTE from "../../_app/config/route";
import { ALERT } from "../../common/constants";


import S from "./MainPage.module.css";
import ShopBox from "./modules/shop-box/ShopBox";


import type { MainPageModel } from "./config/type";
import type { GFC } from "../../common/types/fc";


const MainPage: GFC = ({ connector }) => {
    const [model, setModel] = useState<MainPageModel|null>(null);
    const navigator = useNavigate();
    
    useEffect(() => {
        if (!connector.current) return;
        
        void (async () => {
            try {
                const response = await connector.current?.get<MainPageModel>('/shop');
                setModel(response as MainPageModel);
            } catch(e) {
                alert(ALERT.REQ_FAIL);
                navigator(APP_ROUTE.MAIN);
            }
        })();
    }, []);
    
    return (
        <div className={S['container']}>
            {
                model?.length && model.map((d, i) => {
                    return (
                        <Link to={d.openStatus ? `/menu/${d._id}` : ''} key={`ShopBox-${i}`}>
                            <ShopBox icon={d.icon} name={d.name}
                                location={d.location} openStatus={d.openStatus}
                            />
                        </Link>
                    );
                })
            }
        </div>
    );
};

export default MainPage;
