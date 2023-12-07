import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
const controls = new OrbitControls(camera, renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
//const gridHelper = new THREE.GridHelper(40,100,0xffffff,0xffffff)

const pointLight = new THREE.PointLight(0xffffff,100)
scene.add(pointLight)
//scene.add(new THREE.AmbientLight(0xffffff))

let material = new THREE.MeshStandardMaterial({ color: 0x000000}); 
const geometry = new THREE.BoxGeometry(1, 1, 1);
let blocks = [];
function wall() {
  for (let x = -8; x <= 8; x++) {
    for (let y = -5; y <= 5; y++) {
      let cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, y, 5);
      scene.add(cube);
      blocks[x] = [];
      blocks[x][y] = cube;
    }
  }
}




function animate(){
  requestAnimationFrame(animate);
  controls.update();
  TWEEN.update()
  camera.position.setZ(10)
  renderer.render(scene, camera);
}
wall();
camera.position.set(0, 0, 10);



document.addEventListener('mousemove', onMouseMove);
function onMouseMove(event) {
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );
  pointLight.position.set(    (event.clientX / window.innerWidth) * 2 - 1,
  -(event.clientY / window.innerHeight) * 2 + 1,7)
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children.filter(obj => obj instanceof THREE.Mesh));
  // Move cubes where the mouse is over
  intersects.forEach(intersect => {
    const cube = intersect.object;
    tweenCubePosition(cube, cube.position.z, 6);
    
  });
  // Reset the position of all cubes
  scene.children.filter(obj => obj instanceof THREE.Mesh).forEach(cube => {
    if (!intersects.find(intersect => intersect.object === cube)) {
      tweenCubePosition(cube, cube.position.z, 5);
    }
  });
}
function tweenCubePosition(cube, startZ, endZ) {
  // Create a tween for cube position
  new TWEEN.Tween({ z: startZ })
    .to({ z: endZ }, 100) // Adjust the duration as needed
    .onUpdate(obj => {
      cube.position.z = obj.z;
    })
    .start();
}



animate();