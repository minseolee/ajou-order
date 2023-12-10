import type { MainPageData } from "../../main-page/config/type";

interface HistoryPageData {
    _id : string;
    userId : string;
    shopId : number;
    shop : MainPageData; 
    items : Array<{
        menuId: string;
        quantity: number;
    }>
    waitingCount : number;
    totalPrice : number;
    takeout : boolean;
    paymentMethod: string;
    createdTime: string;
    status: string;
}

interface ItemData {
    menuId: string;
    quantity: number;
}

type HistoryPageModel = HistoryPageData[];
type ItemModel = ItemData[];


export type { 
    HistoryPageModel, 
    HistoryPageData,
    ItemModel,
    ItemData
};
