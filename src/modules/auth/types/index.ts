export type NSignUpApiResponseType = {
	message: string;
	data: {
		user: {
			name: {
				first: string;
				last: string;
			};
			email: string;
			oauth: string;
			roles: string;
			companyRef: string;
		};
		token: string;
	};
};

export type UserLoginDataType = {
	email: string;
	password: string;
    lastActivity?: Date
};

export type UserRegisterDataType = {
	name: {
		first: string;
		last: string;
	};
	email: string;
	password: string;
	confirmPassword: string;
	roles?: string;
	token?: string;
    lastActivity?: Date
};