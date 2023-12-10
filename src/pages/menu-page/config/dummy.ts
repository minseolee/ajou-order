import type { MenuPageModel } from "./type";

const MENU_PAGE_DUMMY: MenuPageModel = {
    shop: {
        _id: '1',
        name: '만권화밥',
        icon: '',
        location: '학생회관 1층',
        openStatus: true,
    },
    menus: [{
        _id: '1',
        name: '만두',
        price: 1000,
        image: '',
        soldout: false
    },
    {
        _id: '2',
        name: '초밥',
        price: 100,
        image: '',
        soldout: true
    },
    {
        _id: '3',
        name: '파스타',
        price: 10000,
        image: '',
        soldout: false
    }]
};

export { MENU_PAGE_DUMMY };
