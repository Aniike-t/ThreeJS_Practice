import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export let CarPosX = 0;
export let CarPosZ = 0;
export const carContainer = new THREE.Object3D();
export const keys = { W: false, A: false, S: false, D: false };

export const loadCar = () => {
  return new Promise((resolve, reject) => {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('../../public/models/car/sedanSports.mtl', (mtl) => {
      mtl.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(mtl);
      objLoader.load('../../public/models/car/sedanSports.obj', (root) => {
        root.scale.set(0.25,0.25,0.25);
        root.rotation.set(0, Math.PI, 0);
        root.position.set(0, 0.1, 0);
        carContainer.add(root);
        resolve(); // Resolve the promise when the model is loaded
      });
    });
  });
};


export const updateCarPosition = (camera) => {
  const speed = 0.1;
  const turnSpeed = 0.02;

  document.addEventListener('keydown', (event) => {
    handleKeyDown(event.key);
  });
  
  document.addEventListener('keyup', (event) => {
    handleKeyUp(event.key);
  });
  
  const handleKeyDown = (key) => {
    keys[key.toUpperCase()] = true;
  };
  
  const handleKeyUp = (key) => {
    keys[key.toUpperCase()] = false;
  };
  

  if (keys.W) {
    carContainer.position.x -= Math.sin(carContainer.rotation.y) * speed;
    carContainer.position.z -= Math.cos(carContainer.rotation.y) * speed;
  }
  if (keys.A) {
    carContainer.rotation.y += turnSpeed;
  }
  if (keys.S) {
    carContainer.position.x += Math.sin(carContainer.rotation.y) * speed;
    carContainer.position.z += Math.cos(carContainer.rotation.y) * speed;
  }
  if (keys.D) {
    carContainer.rotation.y -= turnSpeed;
  }
  CheckCamLocation(camera)
};


function CheckCamLocation(camera){
  const followDistance = -2; // Adjust the distance from the carContainer

  camera.position.x = carContainer.position.x - Math.sin(carContainer.rotation.y) * followDistance;
  camera.position.y = carContainer.position.y + 4;
  camera.position.z = carContainer.position.z - Math.cos(carContainer.rotation.y) * followDistance;

  camera.lookAt(carContainer.position);
}