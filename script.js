const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];

for(let i = 0; i < 150; i++){
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.5 + 0.2
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  for(let star of stars){
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI*2);
    ctx.fillStyle = "#FFD700";
    ctx.fill();

    star.y -= star.speed;
    if(star.y < 0){
      star.y = canvas.height;
      star.x = Math.random() * canvas.width;
    }
  }

  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
