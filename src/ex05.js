import * as THREE from "three";
import gsap from "gsap";

export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true, // 좀 더 부드러워진다.
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio); // 사용자 기기의 픽셀 밀도값만큼 canvas의 밀도를 키워준다.
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // 정수가 아닌 밀도값이 많아 성능이 떨어지는 것을 방지하자.

  // Scene
  // Fog
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("black", 3, 7);

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

  camera.lookAt(0, 0, 0);
  scene.add(camera);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 1); // 빛의 색과 강도
  light.position.x = 1;
  light.position.z = 20;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: "red",
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  // Animation
  let oldTime = Date.now();
  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - oldTime;
    oldTime = newTime;

    renderer.render(scene, camera);

    window.requestAnimationFrame(draw);
    // renderer.setAnimationLoop(draw); // AR이나 VR 컨텐츠를 만들 때 필수이다.
  }
  renderer.render(scene, camera);

  // gsap 애니메이션 라이브러리
  gsap.to(
    mesh.position, // 바꾸고 싶은 JS 오브젝트
    {
      duration: 1, // 재생 시간
      y: 2, // 바꾸고 싶은 속성, 어떤 값으로 바꿀 지
      z: 3,
    }
  );

  function setSize() {
    // 카메라
    // camera.aspect = innerWidth / innerHeight; // window는 전역 객체라서 생각이 가능하다.
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
