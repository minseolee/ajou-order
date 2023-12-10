import type { MainPageData } from "../../main-page/config/type";
import type { MenuPageData } from "../../menu-page/config/type";


// 결제하기 버튼 누르기 전까지 꼭 필요한 데이터들
interface CartItemData {
	shop: MainPageData;
	menus: Array<MenuPageData & { quantity: number }>;
	takeout: boolean;
}

interface CartItemPostModel {
	userId: string;
	shopId: string;
	items: Array<{ menuId: string; quantity: number }>
	paymentMethod: string;
	takeout: boolean;
	waitingCount: number;
	totalPrice: number;
	createdTime: string;
}


interface OrderPostModel {
	"tms_result": boolean;
	"next_redirect_app_url": string;
	"next_redirect_mobile_url": string;
	"next_redirect_pc_url": string;
	"android_app_scheme": string;
	"ios_app_scheme": string;
	"created_at": string;
	"payment_id": string;
}

export type { CartItemData, CartItemPostModel, OrderPostModel };
