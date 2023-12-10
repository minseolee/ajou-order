import type { CartItemPostModel } from "../../cart-page/config/type";

type OrderedItemModel = CartItemPostModel & {
	status: string;
	_id: string;
}

export type { OrderedItemModel };
