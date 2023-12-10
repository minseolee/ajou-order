interface MainPageData {
	_id: string;
	name: string;
	waitingOrderCount?: number;
	icon: string;
	location: string;
	openStatus: boolean;
}

type MainPageModel = MainPageData[];


export type { MainPageData, MainPageModel };
