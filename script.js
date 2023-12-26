// Fireworks effect
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function Firework() {
  this.x = canvas.width / 2;
  this.y = canvas.height;
  this.color = `hsl(${random(0, 360)}, 100%, 50%)`;
  this.radius = 2;
  this.velocity = {
    x: random(-1, 1),
    y: random(-25, -15)
  };
  this.gravity = 0.1;
  this.opacity = 1;
  this.lifeSpan = 100;
}

Firework.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
  ctx.fill();
};

Firework.prototype.update = function() {
  this.velocity.y += this.gravity;
  this.x += this.velocity.x;
  this.y += this.velocity.y;
  this.opacity -= 1 / this.lifeSpan;
};

const fireworks = [];

function createFirework() {
  const firework = new Firework();
  fireworks.push(firework);
}

function animateFireworks() {
  requestAnimationFrame(animateFireworks);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < fireworks.length; i++) {
    fireworks[i].draw();
    fireworks[i].update();
    if (fireworks[i].opacity <= 0) {
      fireworks.splice(i, 1);
    }
  }
}

setInterval(createFirework, 200);
animateFireworks();
