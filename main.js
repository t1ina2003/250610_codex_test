import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0a0a0);

const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(100, 100, 100);
scene.add(sunLight);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

let time = 0;

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(30, 30, 50);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

const groundGeo = new THREE.PlaneGeometry(200, 200);
const groundMat = new THREE.MeshLambertMaterial({ color: 0x444444 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

function createBuilding(width, height, depth, color) {
  const geo = new THREE.BoxGeometry(width, height, depth);
  const mat = new THREE.MeshLambertMaterial({ color });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.y = height / 2;
  return mesh;
}

for (let i = -4; i <= 4; i++) {
  for (let j = -4; j <= 4; j++) {
    if (Math.abs(i) === 0 && Math.abs(j) === 0) continue;
    const w = 4 + Math.random() * 4;
    const h = 5 + Math.random() * 15;
    const d = 4 + Math.random() * 4;
    const color = new THREE.Color().setHSL(Math.random(), 0.5, 0.5);
    const b = createBuilding(w, h, d, color);
    b.position.set(i * 10 + (Math.random() * 2 - 1), 0, j * 10 + (Math.random() * 2 - 1));
    scene.add(b);
  }
}

const roadGeo = new THREE.PlaneGeometry(200, 10);
const roadMat = new THREE.MeshLambertMaterial({ color: 0x222222 });
const road = new THREE.Mesh(roadGeo, roadMat);
road.rotation.x = -Math.PI / 2;
road.position.z = 0;
scene.add(road);

function createCar(color = 0xff0000) {
  const carGeo = new THREE.BoxGeometry(2, 1, 4);
  const mat = new THREE.MeshLambertMaterial({ color });
  const car = new THREE.Mesh(carGeo, mat);
  return car;
}

const cars = [];
for (let i = 0; i < 5; i++) {
  const car = createCar(new THREE.Color().setHSL(Math.random(), 0.7, 0.5));
  car.position.set(-100 + i * 20, 0.5, 0);
  cars.push(car);
  scene.add(car);
}

function createPedestrian(color = 0xffff00) {
  const geo = new THREE.BoxGeometry(0.8, 1.6, 0.8);
  const mat = new THREE.MeshLambertMaterial({ color });
  const p = new THREE.Mesh(geo, mat);
  p.position.y = 0.8;
  return p;
}
const pedestrians = [];
for (let i = 0; i < 10; i++) {
  const p = createPedestrian(new THREE.Color().setHSL(Math.random(), 0.7, 0.5));
  p.position.set(-10 + Math.random() * 20, 0.8, -5 + Math.random() * 10);
  pedestrians.push(p);
  scene.add(p);
}

function createStreetLight() {
  const group = new THREE.Group();
  const poleGeo = new THREE.CylinderGeometry(0.1, 0.1, 5);
  const poleMat = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });
  const pole = new THREE.Mesh(poleGeo, poleMat);
  pole.position.y = 2.5;
  group.add(pole);
  const headGeo = new THREE.SphereGeometry(0.3);
  const headMat = new THREE.MeshStandardMaterial({ emissive: 0xffffee, emissiveIntensity: 1 });
  const head = new THREE.Mesh(headGeo, headMat);
  head.position.set(0, 5, 0);
  group.add(head);
  return group;
}
for (let i = -4; i <= 4; i++) {
  const lamp = createStreetLight();
  lamp.position.set(i * 10, 0, -5);
  scene.add(lamp);
  const lamp2 = createStreetLight();
  lamp2.position.set(i * 10, 0, 5);
  scene.add(lamp2);
}

function createBench() {
  const group = new THREE.Group();
  const seatGeo = new THREE.BoxGeometry(2, 0.3, 0.6);
  const seatMat = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
  const seat = new THREE.Mesh(seatGeo, seatMat);
  seat.position.y = 0.45;
  group.add(seat);
  const legGeo = new THREE.BoxGeometry(0.2, 0.5, 0.2);
  const leg1 = new THREE.Mesh(legGeo, seatMat);
  leg1.position.set(-0.9, 0.25, 0);
  group.add(leg1);
  const leg2 = leg1.clone();
  leg2.position.x = 0.9;
  group.add(leg2);
  return group;
}
for (let i = -2; i <= 2; i++) {
  const bench = createBench();
  bench.position.set(i * 8, 0.25, -8);
  scene.add(bench);
}

function createTree() {
  const group = new THREE.Group();
  const trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 2);
  const trunkMat = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.y = 1;
  group.add(trunk);
  const leavesGeo = new THREE.SphereGeometry(1.2, 8, 8);
  const leavesMat = new THREE.MeshLambertMaterial({ color: 0x228B22 });
  const leaves = new THREE.Mesh(leavesGeo, leavesMat);
  leaves.position.y = 2.3;
  group.add(leaves);
  return group;
}
for (let i = -3; i <= 3; i++) {
  const tree = createTree();
  tree.position.set(i * 10 + 5, 0, -12);
  scene.add(tree);
}

function animate() {
  requestAnimationFrame(animate);

  time += 0.001;
  const t = (Math.sin(time) + 1) / 2;
  sunLight.intensity = 0.5 + t;
  sunLight.position.set(100 * Math.cos(time), 100 * Math.sin(time), 100);
  scene.background.setHSL(0.6, 0.6, 0.6 * t + 0.1);

  cars.forEach(car => {
    car.position.x += 0.5;
    if (car.position.x > 100) car.position.x = -100;
  });

  pedestrians.forEach(p => {
    p.position.x += 0.02 * (Math.random() - 0.5);
    p.position.z += 0.02 * (Math.random() - 0.5);
  });

  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
