/* eslint-env browser */
import { renderBuild, renderFlight } from './scenes';
import { doNothing } from './utils';

const renderScene = () => {
	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	canvas.width = window.innerWidth * 2;
	canvas.height = window.innerHeight * 2;


	context.translate(canvas.width / 2, canvas.height / 2);

	const duration = 2; // seconds
	let segments;
	const loop = () => renderFlight(
		context,
		canvas.width,
		canvas.height,
		duration,
	)
		.then(() => renderBuild(
			context,
			canvas.width,
			canvas.height,
			5,
			segments,
		))
		.then(doNothing(2))
		.then((newSegments) => { segments = [...newSegments]; })
		.then(loop);

	loop();
};

window.onload = () => {
	renderScene();
};
