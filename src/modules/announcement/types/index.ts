export type GetAllNotificationType = {
	success: boolean;
	message: string;
	data: {
		notifications: Notification[]
	};
	error: object;
}

export type Notification = {
	_id?: string;
	title: string;
	subject: string;
	notificationBody?: string;
	notificationStatus: NOTIFICATION;
	notificationSeenStatus: {
		userRef: string,
		seenAt: string,
		isSeen: boolean
	}[],
	createdAt: string
};

export enum NOTIFICATION {
	DELETED = "DELETED",
	READ = "READ",
	UNREAD = "UNREAD",
	SEND = "SEND"
}