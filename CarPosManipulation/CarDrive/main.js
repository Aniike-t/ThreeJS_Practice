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

function CheckCamLocation(){
  const followDistance = -10; // Adjust the distance from the carContainer
  pointLight.position.set(

  )
  camera.position.x = carContainer.position.x - Math.sin(carContainer.rotation.y) * followDistance;
  camera.position.y = carContainer.position.y + 5;
  camera.position.z = carContainer.position.z - Math.cos(carContainer.rotation.y) * followDistance;
  pointLight.position.set(camera.position.x+5,camera.position.y,camera.position.z+5)

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
let speed = 0;
let speedTo0 = true;
const deceleration = 0.001;

function updateCarPosition() {
  // Move the car based on key input
  const turnSpeed = 0.02;
  if(!keys.S && speed<0){
    speed=0
  }
  if (!keys.W && !speedTo0 && speed > 0) {
    console.log("deaccspeed"+speed)
    speed = Math.max(0, speed - deceleration);
    const frontVector = new THREE.Vector3(0, 0, -1);
    frontVector.applyAxisAngle(new THREE.Vector3(0, 1, 0), carContainer.rotation.y);
    carContainer.position.addScaledVector(frontVector, speed);

    if (speed === 0) {
      speedTo0 = true;
    }
  }


  if (keys.W) {
    if(speed<0){
      speed=0
    }
    speedTo0 = false;
    speed = accelerate(speed)
    const frontVector = new THREE.Vector3(0,0,-1)
    frontVector.applyAxisAngle(new THREE.Vector3(0,1,0),carContainer.rotation.y)
    carContainer.position.addScaledVector(frontVector,speed)
  }
  if (keys.A) {
    carContainer.rotation.y += turnSpeed;
  }
  if (keys.S && speed<0.2) {
    speed = backAccelerate(speed)
    console.log("backspeed : "+speed)
    const backVector = new THREE.Vector3(0,0,1)
    backVector.applyAxisAngle(new THREE.Vector3(0,1,0),carContainer.rotation.y)
    carContainer.position.addScaledVector(backVector,speed)
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
  //carContainer.position.set(CarPosX,CarPosY,CarPosZ)
  renderer.render(scene,camera)
}
animate()



function accelerate(s) {
  const maxSpeed = 0.5;
  const acceleration =0.03
  s = accCalculation(maxSpeed,acceleration,s)
  return s;
}
function backAccelerate(s) {
  const maxSpeed = 0.2;
  const acceleration = 0.02;
  s = accCalculation(maxSpeed,acceleration,s)
  return s
}
let lastTimestamp = null;
function accCalculation(maxSpeed,acceleration,s){
  if (s < maxSpeed) {
    const currentTimestamp = performance.now();
    const deltaTime = lastTimestamp ? (currentTimestamp - lastTimestamp) / 1000 : 0;
    s += acceleration * deltaTime;
    s = Math.min(s, maxSpeed);
    lastTimestamp = currentTimestamp;
  } else {
    s = maxSpeed;
  }
  console.log(s);
  return s;
}

