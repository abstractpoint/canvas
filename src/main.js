import { randomRange, scaleToF } from "./utils";

window.onload = function() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const width = canvas.width = window.innerWidth * 2;
    const height = canvas.height = window.innerHeight * 2;
    let time = 0;

    context.translate(width / 2, height / 2);

    let lines = [
    ];

    populateLines(20);

    update();

    function update() {
        time += 100;
        context.clearRect(-width / 2, -height / 2, width, height);
        for (var i = 0; i < lines.length; i += 1) {

            context.beginPath();

            if ((lines[i][3] + lines[i][2]) > 0) {
                lines[i][3] -= 10;
                drawLine(lines[i][0], lines[i][1], lines[i][3] > 0 ? lines[i][3] : 0 , lines[i][3] + lines[i][2]);
            }
            context.lineWidth = 2;
            context.stroke();
        }

        if (time > 100) {
            populateLines(20);
            time = 0;
        }


        requestAnimationFrame(update);
    }

    function drawLine(x, y, fromZ, toZ) {
        context.moveTo.apply(context, scaleToF([x, y, fromZ]));
        context.lineTo.apply(context, scaleToF([x, y, toZ]));
    }

    function populateLines(q) {
        Array(q).fill(true).forEach(()=>{
            lines.push([randomRange(-width / 2, width / 2), randomRange(-width / 2, width / 2), randomRange(0, 100), randomRange(1000, 2000)]);
        })
    }
}