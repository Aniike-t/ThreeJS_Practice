import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

const renderer = new THREE.WebGL1Renderer({
  canvas: document.getElementById("bg")
})
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
const controls = new OrbitControls(camera,renderer.domElement)
const gridHelper = new THREE.GridHelper(300,40,0x000000,0x000000)
const ambientLight = new THREE.AmbientLight(0xfffffff)
const carContainer = new THREE.Object3D();
const pointLight = new THREE.PointLight(0xffffff,1000)
scene.add(pointLight)

const planeGeometry = new THREE.PlaneGeometry(200, 200,200);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x35353535, side: THREE.DoubleSide });
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh)
planeMesh.rotation.x = Math.PI / 2;
planeMesh.position.y = 0.01;

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth,window.innerHeight)
scene.add(camera)
scene.add(gridHelper)
scene.add(ambientLight)

camera.position.setZ(30);

let CarPosX= 0
let CarPosY= 0
let CarPosZ= 0


//Camera Working
function CheckCamLocation(){
  // if(camera.position.x>CamZMax){
  //   camera.position.x=20
  // }
  // if(camera.position.x<CamZMax*(-1)){
  //   camera.position.x=-20
  // }
  const followDistance = -10; // Adjust the distance from the carContainer
  pointLight.position.set(

  )
  camera.position.x = carContainer.position.x - Math.sin(carContainer.rotation.y) * followDistance;
  camera.position.y = carContainer.position.y + 5;
  camera.position.z = carContainer.position.z - Math.cos(carContainer.rotation.y) * followDistance;
  pointLight.position.set(camera.position.x+5,camera.position.y+5,camera.position.z+5)

  camera.lookAt(carContainer.position);
}


//Car Model
const loader = new FBXLoader();
loader.load('models/Sedan.fbx', (object) => {
  object.scale.set(0.01,0.01,-0.01)
  carContainer.add(object);
  scene.add(carContainer);
  animate();
});


const keys = { W: false, A: false, S: false, D: false };
document.addEventListener('keydown', (event) => {
  handleKeyDown(event.key);
});
document.addEventListener('keyup', (event) => {
  handleKeyUp(event.key);
});
function handleKeyDown(key) {
  keys[key.toUpperCase()] = true;
}
function handleKeyUp(key) {
  keys[key.toUpperCase()] = false;
}

function updateCarPosition() {
  // Move the car based on key input
  const speed = 0.1;
  const turnSpeed = 0.02;
  if (keys.W) {
    CarPosX -= Math.sin(carContainer.rotation.y) * speed;
    CarPosZ -= Math.cos(carContainer.rotation.y) * speed;
  }
  if (keys.A) {
    carContainer.rotation.y += turnSpeed;
  }
  if (keys.S) {
    CarPosX += Math.sin(carContainer.rotation.y) * speed;
    CarPosZ += Math.cos(carContainer.rotation.y) * speed;
    console.log(CarPosX+" "+CarPosZ)
  }
  if (keys.D) {
    carContainer.rotation.y -= turnSpeed;
  }
}

function animate(){
  requestAnimationFrame(animate)
  controls.update()
  CheckCamLocation()
  updateCarPosition()
  carContainer.position.set(CarPosX,CarPosY,CarPosZ)
  renderer.render(scene,camera)
}
animate()