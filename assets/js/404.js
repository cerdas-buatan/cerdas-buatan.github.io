function drawVisor() {
  const canvas = document.getElementById('visor');
  if (!canvas) {
    return; // Handle potential error if canvas is not found
  }

  const ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.moveTo(5, 45);
  ctx.bezierCurveTo(15, 64, 45, 64, 55, 45);

  ctx.lineTo(55, 20);
  ctx.bezierCurveTo(55, 15, 50, 10, 45, 10);

  ctx.lineTo(15, 10);
  ctx.bezierCurveTo(15, 10, 5, 10, 5, 20);
  ctx.lineTo(5, 45);

  ctx.fillStyle = '#2f3640';
  ctx.strokeStyle = '#f5f6fa';
  ctx.fill();
  ctx.stroke();
}

function drawCord() {
  const cordCanvas = document.getElementById('cord');
  if (!cordCanvas) {
    return; // Handle potential error if canvas is not found
  }

  const ctx = cordCanvas.getContext('2d');

  ctx.clearRect(0, 0, cordCanvas.width, cordCanvas.height); // Clear entire canvas

  ctx.beginPath();
  ctx.moveTo(130, 170);
  ctx.bezierCurveTo(250, y1, 345, y2, 400, y3);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 8;
  ctx.stroke();
}

let y1 = 160;
let y2 = 100;
let y3 = 100;

let y1Forward = true;
let y2Forward = false;
let y3Forward = true;

function animate() {
  requestAnimationFrame(animate);

  // Update y-coordinates considering potential edge cases
  y1 += y1Forward ? 1 : -1;
  y2 += y2Forward ? 1 : -1;
  y3 += y3Forward ? 1 : -1;

  if (y1 <= 100 || y1 >= 300) {
    y1Forward = !y1Forward;
  }

  if (y2 <= 100 || y2 >= 310) {
    y2Forward = !y2Forward;
  }

  if (y3 <= 100 || y3 >= 317) {
    y3Forward = !y3Forward;
  }

  drawCord(); 
}

drawVisor();
animate();
