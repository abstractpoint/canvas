/* eslint-env browser */
import {
	makeCircularBuffer,
	scaleToF,
	randomRange,
} from './utils';

export const renderFlight = (
	context,
	width,
	height,
	duration = 5,
) => new Promise((resolve) => {
	const buffer = makeCircularBuffer(1000);
	const lines = buffer.read();

	function drawLine(x, y, fromZ, toZ) {
		context.moveTo(...scaleToF([x, y, fromZ]));
		context.lineTo(...scaleToF([x, y, toZ]));
	}

	function populateLines(q) {
		Array(q).fill(true).forEach(() => {
			// x, y, length, z
			buffer.insert([
				randomRange(-width / 2, width / 2),
				randomRange(-width / 2, width / 2),
				randomRange(0, 100),
				randomRange(500, 1000)]);
		});
	}

	let timeElapsed = false;

	setTimeout(() => {
		timeElapsed = true;
		resolve(buffer);
	}, duration * 1000);

	function update() {
		populateLines(10);
		context.clearRect(-width / 2, -height / 2, width, height);
		for (let i = 0; i < lines.length; i += 1) {
			context.beginPath();

			if ((lines[i][3] + lines[i][2]) > 0) {
				lines[i][3] -= 10;
				drawLine(
					lines[i][0],
					lines[i][1],
					lines[i][3] > 0 ? lines[i][3] : 0,
					lines[i][3] + lines[i][2],
				);
			}
			context.lineWidth = 2; // eslint-disable-line no-param-reassign
			context.stroke();
		}

		if (!timeElapsed) requestAnimationFrame(update);
	}

	update();
});

export const renderBuild = (
	context,
	width,
	height,
	duration = 5,
) => new Promise((resolve) => {
	const segments = [];

	function drawLine(x, y, x2, y2) {
		context.moveTo(...scaleToF([x, y, 20]));
		context.lineTo(...scaleToF([x2, y2, 20]));
	}

	function makeSegment() {
		// x, y, length, z
		segments.push([
			randomRange(-width / 2, width / 2),
			randomRange(-width / 2, width / 2),
			randomRange(-width / 2, width / 2),
			randomRange(-width / 2, width / 2),
		]);
	}

	let timeElapsed = false;

	setTimeout(() => {
		timeElapsed = true;
		resolve(segments);
	}, duration * 1000);

	function update() {
		context.clearRect(-width / 2, -height / 2, width, height);

		context.beginPath();

		makeSegment();
		segments.forEach((item) => {
			drawLine(
				item[0],
				item[1],
				item[2],
				item[3],
			);
		});

		context.lineWidth = 2; // eslint-disable-line no-param-reassign
		context.stroke();

		if (!timeElapsed) requestAnimationFrame(update);
	}

	update();
});
