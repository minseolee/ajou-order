import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import APP_ROUTE from "../../../../_app/config/route";
import { ALERT } from "../../../../common/constants";

import S from './ShopBox.module.css';

import type { MainPageData } from "../../config/type";
import type { FC } from "react";

interface Props {
	icon: MainPageData['icon'];
	name: MainPageData['name'];
	location: MainPageData['location'];
	openStatus: MainPageData['openStatus'];
}

const ShopBox: FC<Props> = ({ icon, name, location, openStatus }) => {
    const navigator = useNavigate();
	
    useEffect(() => {
        if (openStatus) return;
		
        alert(ALERT.CLOSED);
        navigator(APP_ROUTE.MAIN);
    }, []);
	
    return (
        <div className={[S['container'], openStatus ? '' : S['not-open']].join(' ')}>
            <img className={S['icon']} src={icon} alt={`${icon}icon`} />
            <div className={S['text-box']}>
                <span className={S['title']}>{name}</span>
                <span className={S['subtitle']}>{location}</span>
            </div>
        </div>
    );
};

export default ShopBox;
