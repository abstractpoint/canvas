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
	segments = [],
) => new Promise((resolve) => {
	function drawLine(x, y, z, x2, y2, z2) {
		context.moveTo(...scaleToF([x, y, z]));
		context.lineTo(...scaleToF([x2, y2, z2]));
	}

	function makeSegment() {
		// x, y, length, z
		const previousSegment = segments.slice(-1)[0];
		let coords;
		let x2 = 0;
		let y2 = 0;
		let z2 = 0;
		const randomDirection = Math.floor(randomRange(1, 7));
		switch (randomDirection) {
		case 1:
			y2 = -100;
			break;
		case 2:
			y2 = 100;
			break;
		case 3:
			x2 = -100;
			break;
		case 4:
			x2 = 100;
			break;
		case 5:
			z2 = -100;
			break;
		case 6:
			z2 = 100;
			break;
		default:
			// nothing
		}

		if (segments.length > 0) {
			coords = [
				previousSegment[3],
				previousSegment[4],
				previousSegment[5],
				previousSegment[3] + x2,
				previousSegment[4] + y2,
				(previousSegment[5] + z2) > 9 ? previousSegment[5] + z2 : 0,
			];
		} else {
			coords = [
				0,
				0,
				20,
				x2,
				y2,
				20 + z2,
			];
		}
		segments.push(coords);
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
				item[4],
				item[5],
			);
		});

		context.lineWidth = 2; // eslint-disable-line no-param-reassign
		context.stroke();

		if (!timeElapsed) requestAnimationFrame(update);
	}

	update();
});
