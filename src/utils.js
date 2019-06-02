/* eslint-env browser */
export const randomRange = (fromNum, toNum) => {
	const diff = toNum - fromNum;
	return fromNum + (Math.random() * diff);
};

export const scaleToF = ([x, y, z]) => {
	const f = 100;
	const multiplier = f / (f + z);
	return [x * multiplier, y * multiplier];
};

export const makeCircularBuffer = (size, initial = []) => {
	const buffer = Array(size).fill(true);
	initial.forEach((item, i) => {
		buffer[i] = item;
	});
	let position = 0;

	return {
		insert(item) {
			buffer[position] = item;
			if (position < (size - 1)) {
				position += 1;
			} else {
				position = 0;
			}
		},
		read() {
			return buffer;
		},
		getCurrentPosition() {
			return position;
		},
		getSize() {
			return size;
		},
	};
};

export const doNothing = duration => passthrough => new Promise((resolve) => {
	const resolveWithPassthrough = () => resolve(passthrough);
	setTimeout(resolveWithPassthrough, duration * 1000);
});
