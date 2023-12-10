import { useContext, useEffect, useState } from "react";

import { CONFIRM } from "../../common/constants";
import { detectDeviceType, DEVICE } from "../../common/utils/device";
import { moneyFormatter } from "../../common/utils/fomat";
import { sum } from "../../common/utils/jjLodash";
import QuantityController from "../../components/quantity-controller/QuantityController";
import { CartContext } from "../../contexts/cart";

import S from './CartPage.module.css';

import type { CartItemData, OrderPostModel } from "./config/type";
import type { GFC } from "../../common/types/fc";


const CartPage: GFC = ({ connector }) => {
    const { cartItem, setCartItem } = useContext(CartContext);
    const [quantities, setQuantities] = useState<number[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    
    
    useEffect(() => {
        setQuantities(cartItem?.menus.map((d) => d.quantity) ?? []);
    }, [cartItem]);
    
    useEffect(() => {
        setTotalPrice(() => {
            let _totalPrice = 0;
            cartItem?.menus.forEach((d, i) => {
                _totalPrice += d.price * quantities[i];
            });
            return _totalPrice;
        });
    }, [cartItem, quantities]);
    
    
    const handleRemoveItem = (i: number) => {
        if (confirm(CONFIRM.CART.REMOVE)) {
            const _item  = { ...cartItem } as CartItemData | null;
            _item?.menus?.splice(i, 1);
            setCartItem(_item);
        }
    };
    
    const handleOrder = () => {
        if (!cartItem?.shop || !connector.current) return;
    
        void (async () => {
            try {
                const _device = detectDeviceType();
    
                const orderRequest = await connector.current!.post<OrderPostModel>('/order', {
                    shopId: cartItem.shop._id,
                    items: cartItem.menus.map((d) => ({ menuId: d._id, quantity: d.quantity })),
                    takeout: cartItem.takeout
                });
    
                localStorage.setItem('payment_id', orderRequest.payment_id);
    
                if (_device === DEVICE.MOBILE) window.location.href = orderRequest.next_redirect_mobile_url;
                else if (_device === DEVICE.PC) window.location.href = orderRequest.next_redirect_pc_url;
            } catch (e) {
                alert('결제요청에 실패하였습니다');
                console.error(e);
            }
        })();
    };
    
    
    return (
        <div>
            <div className={S['shop-area']}>
                {cartItem?.shop
                    ? <>
                        <img className={S['shop-image']} src={cartItem?.shop.icon}
                            alt={`shop-${cartItem?.shop.name}`}
                        />
                        <span className={S['shop-name']}>{cartItem?.shop.name}</span>
                    </>
                    : <h1>장바구니에 아이템이 없습니다</h1>
                }
            </div>
            <div className={S['item-area']}>
                {
                    cartItem?.menus.map((d, i) => {
                        return (
                            <div className={S['item']} key={`item-${i}`}>
                                <img className={S['item-image']} src={d.image}
                                    alt={`item-${d.name}`}
                                />
                                <div className={S['item-text']}>
                                    <span className={S['item-name']}>{d.name}</span>
                                    <span className={S['item-price']}>{moneyFormatter(d.price * quantities[i])}</span>
                                    <QuantityController quantity={quantities[i]} setQuantity={setQuantities} index={i} />
                                </div>
                                <div onClick={() => handleRemoveItem(i)} className={S['item-remove']}>x</div>
                            </div>
                        );
                    })
                }
            </div>
            <nav className={S['nav']}>
                {cartItem?.shop &&
                    <button className={S['nav-btn']}
                        onClick={handleOrder}
                    >
                        <span>{sum(quantities)}개</span>
                        <span>결제하기</span>
                        <span>{moneyFormatter(totalPrice)}</span>
                    </button>
                }
            </nav>
        </div>
    );
};

export default CartPage;
