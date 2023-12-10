import { useContext, useState } from "react";

import { CONFIRM } from "../../../../common/constants";
import { moneyFormatter } from "../../../../common/utils/fomat";
import QuantityController from "../../../../components/quantity-controller/QuantityController";
import { BSContext } from "../../../../contexts/bottom-sheet";
import { CartContext } from "../../../../contexts/cart";

import S from './MenuBox.module.css';

import type { MenuPageData, MenuPageModel } from "../../config/type";
import type { FC } from "react";

interface Props {
    _id: MenuPageData['_id']
    name: MenuPageData['name'];
    price: MenuPageData['price'];
    image: MenuPageData['image'];
    soldout: MenuPageData['soldout'];
    shop: MenuPageModel['shop']
}


interface MenuBSElProps { _id: Props['_id']; name: Props['name']; price: Props['price']; image: Props['image']; shop: Props['shop'] }
const MenuBSEl: FC<MenuBSElProps> = ({ _id, name, price, image, shop }) => {
    const { flushBSElement } = useContext(BSContext);
    const { cartItem, setCartItem, addCartItem } = useContext(CartContext);
    
    const [isTakeout, setIsTakeout] = useState(false);
    const [count, setCount] = useState<number>(1);
    
    const _setCartItem = () => setCartItem({
        shop: shop,
        menus: [
            {
                _id: _id,
                name: name,
                price: price,
                quantity: count,
                image: image,
                soldout: false,
            }
        ],
        takeout: isTakeout
    });
    
    const caseCartIsEmpty = () => {_setCartItem();};
    
    const caseCartIsNotSameShop = () => {
        if (confirm(CONFIRM.CART.NO_DUPLICATE_SHOP)) _setCartItem();
    };
    
    const caseCartIsSameShop = () => {
        addCartItem({
            shop: shop,
            menus: [
                {
                    _id: _id,
                    name: name,
                    price: price,
                    quantity: count,
                    image: image,
                    soldout: false,
                }
            ],
            takeout: isTakeout
        });
    };
    
    const handleClickPutIn = () => {
        if (!cartItem) caseCartIsEmpty();
        if (cartItem?.shop && (cartItem?.shop._id !== shop._id)) caseCartIsNotSameShop();
        if (cartItem?.shop && (cartItem?.shop._id === shop._id)) caseCartIsSameShop();
        
        // TODO:: Needs TOAST
        flushBSElement();
    };
    
    return (
        <div className={S['bs-container']}>
            <div>
                <p className={S['bs-title']}>선택</p>
            </div>
            <div className={'flex mt-8 gap-4 items-center justify-center'}>
                <div className={[S['bs-btn-container'], isTakeout ? S['selected'] : ''].join(' ')}
                    onClick={() => setIsTakeout(true)}
                >
                    <span>🥡</span>
                    <span>포장</span>
                </div>
                <div className={[S['bs-btn-container'], !isTakeout ? S['selected'] : ''].join(' ')}
                    onClick={() => setIsTakeout(false)}
                >
                    <span>🍴</span>
                    <span>매장</span>
                </div>
            </div>
            <div className={'mt-6 flex justify-center items-center'}>
                <QuantityController quantity={count} setQuantity={setCount} />
            </div>
            <div className={S['bs-bottom']}>
                <button onClick={handleClickPutIn}>담기</button>
            </div>
        </div>
    );
};

const MenuBox: FC<Props> = ({ _id, name, price, image, soldout, shop }) => {
    const { setBSElement } = useContext(BSContext);
    
    
    const handleClickMenu = () => {
        if (soldout) {
            alert("soldout");
            return;
        }
        
        setBSElement(<MenuBSEl _id={_id} name={name} price={price} image={image} shop={shop} />);
    };
    
    // TODO:: soldout UI
    return (
        <div className={S['container']}
            onClick={handleClickMenu}
        >
            <img className={S['img']} src={image} alt={`${image} img`} />
            <div className={S['text-box']}>
                <span className={S['title']}>{name}</span>
                <span className={S['subtitle']}></span>
            </div>
            <span className={S['price']}>{moneyFormatter(price)}</span>
        </div>
    );
};

export default MenuBox;
