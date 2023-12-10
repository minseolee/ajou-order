import APP_ROUTE from "../../_app/config/route";

interface NavRoute {
	icon: string;
	to: string;
}

const NAV_ROUTE: NavRoute[] = [
    {
        icon: '🧾',
        to: APP_ROUTE.HISTORY,
    },
    {
        icon: '🏠',
        to: APP_ROUTE.MAIN,
    },
    {
        icon: '👤',
        to: '',
    },
];

export { NAV_ROUTE };
