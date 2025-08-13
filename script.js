// === THREE.JS SETUP ===
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('birthdayCanvas'),
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffd27f, 1.5, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// STARS
const starTexture = new THREE.TextureLoader().load('assets/textures/star.png');
const starGeometry = new THREE.BufferGeometry();
const starCount = 2000;
const starPositions = [];

for (let i = 0; i < starCount; i++) {
  const x = (Math.random() - 0.5) * 500;
  const y = (Math.random() - 0.5) * 500;
  const z = (Math.random() - 0.5) * 500;
  starPositions.push(x, y, z);
}

starGeometry.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(starPositions, 3)
);

const starMaterial = new THREE.PointsMaterial({
  size: 1.2,
  map: starTexture,
  transparent: true,
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// GOLDEN STRUCTURE
const goldTexture = new THREE.TextureLoader().load('assets/textures/gold.jpg');
const geometry = new THREE.IcosahedronGeometry(3, 1);
const material = new THREE.MeshStandardMaterial({
  map: goldTexture,
  metalness: 0.9,
  roughness: 0.2,
});
const goldenShape = new THREE.Mesh(geometry, material);
scene.add(goldenShape);

// MUSIC
const music = new Howl({
  src: ['assets/music.mp3'],
  autoplay: true,
  loop: true,
  volume: 0.5,
});

// TEXT ELEMENT
const birthdayText = document.getElementById('birthdayText');

// FUNCTION TO FADE IN TEXT
function fadeInText() {
  birthdayText.style.opacity = '1';
}

// FUNCTION TO FADE OUT TEXT
function fadeOutText() {
  birthdayText.style.opacity = '0';
}

// ANIMATION LOOP
let animationStartTime = null;

function animate(time) {
  if (!animationStartTime) animationStartTime = time;
  const elapsed = time - animationStartTime;

  requestAnimationFrame(animate);

  // Rotate golden shape slowly
  goldenShape.rotation.y += 0.002;
  goldenShape.rotation.x += 0.001;

  // Move camera forward slowly
  camera.position.z -= 0.005;

  // Subtle star rotation
  stars.rotation.y += 0.0005;

  // Show text between 6 and 14 seconds
  if (elapsed > 6000 && elapsed < 14000) {
    fadeInText();
  } else {
    fadeOutText();
  }

  renderer.render(scene, camera);
}

animate();

// RESPONSIVE
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
