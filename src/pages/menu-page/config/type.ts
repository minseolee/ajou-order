import type { MainPageData } from "../../main-page/config/type";

interface MenuPageData {
	_id: string;
	name: string;
	price: number;
	image: string;
	soldout: boolean;
}

interface MenuPageModel {
	shop: MainPageData;
	menus: MenuPageData[];
}

export type { MenuPageData, MenuPageModel };
