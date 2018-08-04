export class TokenModel {
	user_name: string;
	fullName: string;
	authorities: string[];
	email: string;

	constructor() {
		this.authorities = [];
	}
}
