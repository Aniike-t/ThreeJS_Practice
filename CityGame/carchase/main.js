import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import buildingConfig from './src/config/buildingConfig';
import loadBuilding from './src/entities/loadBuilding';
import createGrid from './src/entities/grid';
import Stats from 'stats.js'
import roadConfig from './src/config/RoadConfigs';
import { loadCar, updateCarPosition, CarPosX, CarPosZ, keys , carContainer} from './src/entities/player';
import checkCollisions from './src/entities/collision/checkCollision';
import * as CANNON from 'cannon-es';



function main() {
  const canvas = document.getElementById('bg');
  // Set up Three.js scene
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.setPixelRatio(window.devicePixelRatio);

  const material = new THREE.LineBasicMaterial();
  material.vertexColors = true;

  const controls = new OrbitControls(camera, renderer.domElement);
  // Set up grid
  const gridSize = 40;
  const cellSize = 1;
  createGrid(scene, gridSize, cellSize);

  // Create a Cannon.js plane shape
  const planeShape = new CANNON.Plane();
  const planeBody = new CANNON.Body({ mass: 0 }); // Set mass to 0 for a static body
  planeBody.addShape(planeShape);

  // Set the position of the plane body
  const planePosition = new CANNON.Vec3(0, 0, 0); // Adjust as needed
  planeBody.position.copy(planePosition);

  // Rotate the plane body to match the orientation of the Three.js plane
  const planeQuaternion = new CANNON.Quaternion();
  planeQuaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
  planeBody.quaternion.copy(planeQuaternion);

  // Add the plane body to the physics world
  physicsWorld.addBody(planeBody);

  // Add the Three.js plane to the scene (as you've already done)
  scene.add(planeMesh);

  const physicsWorld = new CANNON.World({
    gravity: new CANNON.Vec3(0,-9.82,0)
  });
  physicsWorld.broadphase = new CANNON.SAPBroadphase(physicsWorld);

  //add stats to scene
  const stats = new Stats();
  document.body.appendChild(stats.dom);

  // Set up camera position
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);

  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);
  const pointlight = new THREE.PointLight(0xffffff,50000)
  pointlight.position.set(0,100,0)
  scene.add(pointlight)
  loadCar();

  loadCar().then(() => {
      scene.add(carContainer);
      carContainer.position.set(0, 0.1, 0);
      animate();
    });
  // Render loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update()
    stats.update();
    checkCollisions(carContainer,scene);
    updateCarPosition(camera);
    physicsWorld.step(1 / 60);
    console.log(`Car Position: ${carContainer.position.x}, ${carContainer.position.z}`);
    renderer.render(scene, camera);
  }
  // Render buildings from buildingConfig
  buildingConfig.forEach((config) => {
    const { position, obj, mtl , scale, rotate} = config;
    loadBuilding(obj, mtl, position, scene, scale, rotate);
  });
  roadConfig.forEach((config) => {
    const { position, obj, mtl , scale, rotate} = config;
    loadBuilding(obj, mtl, position, scene, scale, rotate);
  });
}




main();