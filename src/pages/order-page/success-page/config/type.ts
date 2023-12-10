import type { CartItemPostModel } from "../../../cart-page/config/type";

interface OrderApprovePostModel {
	"_id": string;
	"userId": CartItemPostModel['userId'],
	"shopId": CartItemPostModel['shopId'],
	"items": CartItemPostModel['items'],
	"paymentMethod": CartItemPostModel['paymentMethod']
	"waitingCount": CartItemPostModel['waitingCount']
	"takeout": CartItemPostModel['takeout']
	"totalPrice": CartItemPostModel['totalPrice']
	"createdTime": CartItemPostModel['createdTime']
}

export type { OrderApprovePostModel };
