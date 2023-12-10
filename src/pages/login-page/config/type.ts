interface LoginPagePostModel {
	createdDate: string;
	email: string
	loginId: string
	name: string
	phone: string
	role: {isAdmin: boolean}
	isAdmin: boolean
	status: boolean
	_id: string;
}

export type { LoginPagePostModel };
