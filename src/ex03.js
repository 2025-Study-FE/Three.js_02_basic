import * as THREE from "three";

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

  camera.lookAt(0, 0, 0);
  scene.add(camera);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 1); // 빛의 색과 강도
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // MeshBasicMaterial는 빛에 영향을 받지 않는 재질이다.
  const material = new THREE.MeshBasicMaterial({
    color: "red",
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  // Animation
  const clock = new THREE.Clock();
  function draw() {
    // const time = clock.getElapsedTime(); // 실행 시점으로부터 '총 경과 시간'
    const delta = clock.getDelta(); // 실행이 될 때마다의 간격, '시간의 차' // getElapsedTime와 getDelta를 함께 사용하면 문제가 된다.

    // 각도는 Radian을 사용한다.
    // 360도는 2파이, 3.14*2 = 6.28
    // mesh.rotation.y += 0.1;
    // mesh.rotation.y += THREE.MathUtils.degToRad(1); // degree(360도) 값을 Radian으로 변환한다. -> 1프레임에 1도 변화.
    // 원래 초당 60프래임으로 움직였으나, 기기 성능(컴퓨터 주사율)마다 프레임 속도가 다르다.
    // mesh.rotation.y = 2 * time;
    mesh.position.y += delta;
    if (mesh.position.y > 3) {
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);

    window.requestAnimationFrame(draw);
    // renderer.setAnimationLoop(draw); // AR이나 VR 컨텐츠를 만들 때 필수이다.
  }

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
