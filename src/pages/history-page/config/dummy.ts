import type { HistoryPageModel } from "./type";

const HISTORY_PAGE_DUMMY: HistoryPageModel = [
    {
        "_id": "656bb8c3fd1861cb6fa562fa",
        "userId": "656b8ec725f8b6df24ab910c",
        "shopId": 3,
        "items": [
            {
                "menuId": "6562292377dd1a645a7e960a",
                "quantity": 2
            },
            {
                "menuId": "6562292377dd1a645a7e9609",
                "quantity": 1
            }
        ],
        "paymentMethod": "MONEY",
        "waitingCount": 39,
        "takeout": true,
        "totalPrice": 22000,
        "createdTime": "2023-12-02T23:07:47.000Z",
        "status": "Pending",
        "shop": {
            "_id": "3",
            "name": "행복돈까스",
            "icon": "https://git.ajou.ac.kr/ajou-pay/jj-s3/-/raw/main/logo/%ED%96%89%EB%B3%B5%EB%8F%88%EA%B9%8C%EC%8A%A4.png?ref_type=heads",
            "location": "구학생회관 1층",
            "openStatus": true,
            "waitingOrderCount": 56
        }
    },
    {
        "_id": "656bb9dafd1861cb6fa56304",
        "userId": "656b8ec725f8b6df24ab910c",
        "shopId": 3,
        "items": [
            {
                "menuId": "6562292377dd1a645a7e960a",
                "quantity": 3
            },
            {
                "menuId": "6562292377dd1a645a7e9609",
                "quantity": 2
            }
        ],
        "paymentMethod": "MONEY",
        "waitingCount": 40,
        "takeout": true,
        "totalPrice": 36500,
        "createdTime": "2023-12-02T23:12:26.000Z",
        "status": "Pending",
        "shop": {
            "_id": "3",
            "name": "행복돈까스",
            "icon": "https://git.ajou.ac.kr/ajou-pay/jj-s3/-/raw/main/logo/%ED%96%89%EB%B3%B5%EB%8F%88%EA%B9%8C%EC%8A%A4.png?ref_type=heads",
            "location": "구학생회관 1층",
            "openStatus": true,
            "waitingOrderCount": 56
        }
    }
];

export { HISTORY_PAGE_DUMMY };
