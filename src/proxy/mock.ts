import commonApi from './api/common';

export const isMock = true;
export const isAllMock = true;
const list = [...commonApi];

export default (url) =>
	list.some((item) => {
		if (isAllMock && isMock) {
			return true;
		}
		if (isMock) {
			return url.indexOf(item) > -1;
		}
	});
