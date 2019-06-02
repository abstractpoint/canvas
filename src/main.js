/* eslint-env browser */
import { renderBuild, renderFlight } from './scenes';
import { doNothing } from './utils';
import dust from './dust';

const renderScene = () => {
	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	canvas.width = window.innerWidth * 2;
	canvas.height = window.innerHeight * 2;


	context.translate(canvas.width / 2, canvas.height / 2);

	const duration = 2; // seconds
	let segments;
	dust(context, canvas.width, canvas.height);
};

window.onload = () => {
	renderScene();
};
