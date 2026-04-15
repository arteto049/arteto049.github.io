const canvas = document.getElementById("network-bg");
const ctx = canvas.getContext("2d");

let points = [];
const POINT_COUNT = 55;
const MAX_DIST = 170;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createPoints() {
  points = [];

  for (let i = 0; i < POINT_COUNT; i++) {
    points.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 2 + 1
    });
  }
}

function updatePoints() {
  for (const p of points) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
    if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;
  }
}

function drawPoints() {
  for (const p of points) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(120, 200, 255, 0.9)";
    ctx.shadowColor = "rgba(88, 166, 255, 0.8)";
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function drawLines() {
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const a = points[i];
      const b = points[j];

      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MAX_DIST) {
        const alpha = 1 - dist / MAX_DIST;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(88, 166, 255, ${alpha * 0.35})`;
        ctx.lineWidth = 1;
        ctx.shadowColor = "rgba(88, 166, 255, 0.35)";
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updatePoints();
  drawLines();
  drawPoints();

  requestAnimationFrame(animate);
}

resizeCanvas();
createPoints();
animate();

window.addEventListener("resize", () => {
  resizeCanvas();
  createPoints();
});