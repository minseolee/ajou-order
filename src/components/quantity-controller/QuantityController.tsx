import S from './QuantityController.module.css';

import type { Dispatch, FC, SetStateAction } from "react";


interface Props {
	quantity: number[] | number;
	setQuantity: Dispatch<SetStateAction<number[]>> | Dispatch<SetStateAction<number>>;
	index?: number;
}

const QuantityController: FC<Props> = ({ quantity, setQuantity, index }) => {
    const handleMinus = () => { // @ts-ignore
        setQuantity((prev: number[] | number) => {
            if (Array.isArray(prev) && index !== undefined) {
                const _prev = [...prev];
                if (_prev[index] >= 2) _prev[index] = _prev[index] - 1;
                return _prev;
            }
            else {
                let _prev = prev as number;
                if (_prev >= 2) _prev -= 1;
                return _prev;
            }
        }); };
    const handlePlus = () => { // @ts-ignore
        setQuantity((prev: number[] | number) => {
            if (Array.isArray(prev) && index !== undefined) {
                const _prev = [...prev];
                _prev[index] = _prev[index] + 1;
                return _prev;
            }
            else {
                let _prev = prev as number;
                _prev += 1;
                return _prev;
            }
        }); };
	
    return (
        <div className={S['container']}>
            <div onClick={handleMinus}>-</div>
            <div>{quantity}</div>
            <div onClick={handlePlus}>+</div>
        </div>
    );
};

export default QuantityController;
