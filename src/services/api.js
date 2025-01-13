const getCall = (url) => {
	return fetch(url, {
		method: 'GET',
		headers: {
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiJ9.eyJvcmdhbml6YXRpb25JZCI6IjVlMDY0ZDA4LTFhMjMtNDA1My1hMWU5LTgzZGQwMTEzYTgyOCIsInN1YiI6IkFkbWluIiwiaWF0IjoxNzM2NjE1Njk4LCJleHAiOjE3MzY3MDIwOTh9.Rz9nOBxzvFEWAnXNrQg281sYp7dPDgqehinKwDvJYtc',
		},
	});
};

const postCall = (url, payload) => {
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiJ9.eyJvcmdhbml6YXRpb25JZCI6IjVlMDY0ZDA4LTFhMjMtNDA1My1hMWU5LTgzZGQwMTEzYTgyOCIsInN1YiI6IkFkbWluIiwiaWF0IjoxNzM2NjE1Njk4LCJleHAiOjE3MzY3MDIwOTh9.Rz9nOBxzvFEWAnXNrQg281sYp7dPDgqehinKwDvJYtc',
		},
	});
};

export const getDepos = () => {
	return getCall(
		'https://navitronics-zovs.onrender.com/navitranix/depotName/getDepotNameWithId/a82198cb-1861-4d13-bda7-3af36a8ea32c'
	);
};
