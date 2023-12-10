const APP_ROUTE = Object.freeze({
    LOGIN: '/login',
    SIGNUP: '/signup',
    MAIN: '/',
    MENU: '/menu/:id',
    CART: '/cart',
    NOTI: '/noti',
    HISTORY: '/history',
    ORDER: {
        SUCCESS: '/order/success',
        FAIL: '/order/fail',
        CANCEL: '/order/cancel'
    },
    ADMIN: '/admin'
});

export default APP_ROUTE;
