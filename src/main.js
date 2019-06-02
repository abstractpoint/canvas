/* eslint-env browser */
import { renderBuild, renderFlight } from './scenes';

const renderScene = () => {
	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	let segments;
	let particles;
	canvas.width = window.innerWidth * 2;
	canvas.height = window.innerHeight * 2;
	context.translate(canvas.width / 2, canvas.height / 2);

	const loop = () => renderFlight(
		context,
		canvas.width,
		canvas.height,
		7,
		particles,
	)
		.then((newParticles) => { particles = [...newParticles]; })
		.then(() => renderBuild(
			context,
			canvas.width,
			canvas.height,
			7,
			segments,
		))
		.then((newSegments) => { segments = [...newSegments]; })
		.then(loop);

	loop();
};

window.onload = () => {
	renderScene();
};
