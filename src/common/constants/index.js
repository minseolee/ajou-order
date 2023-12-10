const CONFIRM = Object.freeze({
    CART: {
        NO_DUPLICATE_SHOP: '한 개의 매장에서만 주문할 수 있습니다.\n장바구니를 초기화하고 이 매장에서 주문할까요?',
        REMOVE: '정말로 삭제하시겠습니까?',
    }
});

const ALERT = Object.freeze({
    REQ_FAIL: '요청에 실패하였습니다',
    REQ_WRONG: '잘못된 접근입니다',
    CLOSED: '영업 중이 아닙니다'
});

const STATUS = Object.freeze({
    PENDING: 'Pending',
    COMPLETED: 'Completed'
});

export { CONFIRM, ALERT, STATUS };
