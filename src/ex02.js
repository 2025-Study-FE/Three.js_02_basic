import * as THREE from "three";

export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true, // 좀 더 부드러워진다.
    // alpha: true, // 배경이 투명해진다. setClearAlpha()를 통해 투명도 값을 조절할 수 있다.
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // console.log(window.devicePixelRatio); // 사용자 기기의 픽셀 밀도값
  renderer.setPixelRatio(window.devicePixelRatio); // 사용자 기기의 픽셀 밀도값만큼 canvas의 밀도를 키워준다.
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // 정수가 아닌 밀도값이 많아 성능이 떨어지는 것을 방지하자.
  // renderer.setClearColor("#00ff00");
  // renderer.setClearAlpha(0.5);

  // Scene
  const scene = new THREE.Scene();
  // scene.background = new THREE.Color("blue"); // 배경 색을 설정한다.

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
  // camera.zoom = 0.5;
  // camera.updateProjectionMatrix();
  scene.add(camera);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 1); // 빛의 색과 강도
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // MeshBasicMaterial는 빛에 영향을 받지 않는 재질이다.
  // MeshStandardMaterial는 빛에 영향을 받는다.
  const material = new THREE.MeshStandardMaterial({
    color: "red",
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);

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
}
