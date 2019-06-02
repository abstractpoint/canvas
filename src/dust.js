/* eslint-env browser */
import { scaleToF } from './utils';

const SimplexNoise = require('simplex-noise');

function noiseLoop(noise, radius, phase, variation) {
	const angle = (phase % 360) * (Math.PI / 180);
	const x = radius / 2 * (Math.sin(angle) + 1);
	const y = radius / 2 * (Math.cos(angle) + 1);
	return noise.noise3D(x, y, variation);
}

function dust(context, width, height) {
	console.log(width, height);
	const noise = new SimplexNoise(432);
	const size = 1000;
	let phase = size;
	function update() {
		phase += 10;

		context.clearRect(-width / 2, -height / 2, width, height);
		for (let ray = 0; ray < 5000; ray += 1) {
			const x = noiseLoop(noise, 20, ray, 0) * width;
			const y = noiseLoop(noise, 20, ray, 10) * height;
			const offset = ((noiseLoop(noise, 10, ray, 0) * size) + phase) % size;
			const length = 50;
			context.beginPath();
			context.moveTo(...scaleToF([x, y, offset]));
			context.lineTo(...scaleToF([x, y, offset + length]));
			context.lineWidth = 1; // eslint-disable-line no-param-reassign
			context.stroke();
		}
		requestAnimationFrame(update);
	}

	update();
}

export default dust;
