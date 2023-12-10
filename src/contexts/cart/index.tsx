import { createContext, useEffect, useState } from "react";

import { cloneDeep } from "../../common/utils/jjLodash";
import logger from "../../common/utils/logger";

import type { CartItemData } from "../../pages/cart-page/config/type";
import type { FC, ReactNode } from "react";

interface CartContextType {
	cartItem: CartItemData | null
	setCartItem: (d: CartItemData | null) => void;
    addCartItem: (d: CartItemData) => void;
    flushCartItem: () => void;
    getCartItemQuantity: () => number;
}

const CartContext = createContext<CartContextType>({
    cartItem: null,
    setCartItem: (d) => { return d; },
    addCartItem: (d) => { return d; },
    flushCartItem: () => {},
    getCartItemQuantity: () => 0,
});

interface Props { children: ReactNode; }
const CartProvider: FC<Props> = ({ children }) => {
    const [item, setItem] = useState<CartContextType['cartItem']>(null);
	
    
    useEffect(() => {
        if (item?.menus.length === 0) {
            flushCartItem();
        }
        
        logger('GLOBAL CartProvider: ', item);
    }, [item]);
    
    
    const setCartItem = (cartItem: CartItemData | null) => {
        setItem(() => cartItem);
    };
    
    
    const addCartItem = (cartItem: CartItemData) => {
        setItem((prevItem) => {
            if (cartItem.shop._id !== prevItem?.shop._id) {
                return cartItem;
            }
            else {
                const _prev = cloneDeep(prevItem);
                _prev?.menus?.push(...cartItem.menus);
                return _prev;
            }
        });
    };
    
    const flushCartItem = () => {
        setItem(null);
    };
    
    const getCartItemQuantity = () => {
        let quantity = 0;
        item?.menus.forEach((d) => {
            quantity += d.quantity;
        });
        return quantity;
    };
	
    return (
        <CartContext.Provider
            value={{
                cartItem: item,
                setCartItem,
                addCartItem,
                flushCartItem,
                getCartItemQuantity
            }}
        >
            { children }
        </CartContext.Provider>
    );
};

export { CartProvider, CartContext };
