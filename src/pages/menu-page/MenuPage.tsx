import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { ALERT } from "../../common/constants";

import MenuBox from "./modules/menu-box/MenuBox";

import type { MenuPageModel } from "./config/type";
import type { GFCWithProp } from "../../common/types/fc";
import type { Dispatch, SetStateAction } from "react";



interface Props {
    setHeaderName: Dispatch<SetStateAction<string>>;
}
const MenuPage: GFCWithProp<Props> = ({ connector, setHeaderName }) => {
    const [model, setModel] = useState<MenuPageModel|null>(null);
    const { pathname } = useLocation();
    
    useEffect(() => {
        if (!connector.current) return;
        
        void (async () => {
            try {
                const response = await connector.current!.get<MenuPageModel>(
                    `/shop/${pathname.split('/').at(2)}/menu`,
                );
                setModel(response);
            } catch {
                alert(ALERT.REQ_FAIL);
            }
        })();
    }, []);
    
    useEffect(() => {
        setHeaderName(model?.shop.name ?? '');
    }, [model]);
    
    return (
        <div>
            {
                model && model.menus.map((d, i) => {
                    return (
                        <MenuBox _id={d._id} name={d.name}
                            price={d.price} image={d.image}
                            soldout={d.soldout} key={`menubox-${i}`}
                            shop={model.shop}
                        />
                    );
                })
            }
        </div>
    );
};

export default MenuPage;
