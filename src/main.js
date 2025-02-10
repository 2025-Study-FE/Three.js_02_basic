import * as THREE from "three";
import { color } from "three/tsl";

// 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const canvas = document.querySelector("#three-canvas");
// const renderer = new THREE.WebGLRenderer({ canvas: canvas });
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true, // 좀 더 부드러워진다.
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view(시야각)
  window.innerWidth / window.innerHeight, // Aspect ratio(종횡비)
  0.1, // Near plane
  1000 // Far plane
);
camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
// MeshBasicMaterial는 빛에 영향을 받지 않는 재질이다.
const material = new THREE.MeshBasicMaterial({
  // color: 0xff0000,
  // color: "#ff0000",
  color: "red",
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 그리기
renderer.render(scene, camera);
