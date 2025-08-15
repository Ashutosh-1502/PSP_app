function formatDate(isoDate: string): string {
	if (!isoDate) return "Invalid date";

	const date = new Date(isoDate);
	if (isNaN(date.getTime())) return "Invalid date";

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const day = date.getUTCDate();
	const month = monthNames[date.getUTCMonth()] ?? "Unknown";
	const year = date.getUTCFullYear();

	return `${String(day)} ${String(month)} ${String(year)}`;
}

export {
    formatDate
}