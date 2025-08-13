// === SETUP SCENE ===
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 15;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('birthdayCanvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// === LIGHTING ===
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffd27f, 1.5, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// === STAR FIELD ===
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

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));

const starMaterial = new THREE.PointsMaterial({
    size: 1.2,
    map: starTexture,
    transparent: true
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// === GOLDEN STRUCTURE ===
const goldTexture = new THREE.TextureLoader().load('assets/textures/gold.jpg');
const geometry = new THREE.IcosahedronGeometry(3, 1);
const material = new THREE.MeshStandardMaterial({
    map: goldTexture,
    metalness: 0.9,
    roughness: 0.2
});
const goldenShape = new THREE.Mesh(geometry, material);
scene.add(goldenShape);

// === TEXT ===
const fontLoader = new THREE.FontLoader();
let birthdayTextMesh;
let textOpacity = 0;

fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const fullMessage = "გილოცავ დაბადების დღეს, Datuna 🌟 მინდა, რომ ეს წელი სავსე იყოს სითბოთი, ბედნიერებით და ოცნებების ასრულებით.\ ბედნიერი ვარ, რომ უკვე 12 წელია ჩემს ცხოვრებაში ხარ. ❤️";
    
    const textGeometry = new THREE.TextGeometry(fullMessage, {
        font: font,
        size: 0.3,
        height: 0.02,
    });
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffd27f, transparent: true, opacity: 0 });
    birthdayTextMesh = new THREE.Mesh(textGeometry, textMaterial);
    textGeometry.center(); // ტექსტი ეკრანის ცენტრში
    birthdayTextMesh.position.set(0, 0, 0);
    scene.add(birthdayTextMesh);
});

// === MUSIC ===
const music = new Howl({
    src: ['assets/music.mp3'],
    autoplay: true,
    loop: true,
    volume: 0.5
});

// === ANIMATION LOOP ===
function animate(time) {
    requestAnimationFrame(animate);

    // Rotate golden shape slowly
    goldenShape.rotation.y += 0.002;
    goldenShape.rotation.x += 0.001;

    // Move camera forward slowly
    camera.position.z -= 0.005;

    // Subtle star rotation
    stars.rotation.y += 0.0005;

    // Show text after ~6 seconds
    if (birthdayTextMesh) {
        if (time > 6000 && time < 14000) {
            if (textOpacity < 1) textOpacity += 0.01;
        } else if (time >= 14000) {
            if (textOpacity > 0) textOpacity -= 0.01;
        }
        birthdayTextMesh.material.opacity = textOpacity;
    }

    renderer.render(scene, camera);
}

animate();

// === RESPONSIVE ===
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
