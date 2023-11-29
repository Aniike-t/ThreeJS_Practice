

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});
const controls = new OrbitControls(camera, renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);



const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry,material);
const pointLight = new THREE.PointLight(0xfffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)
scene.add(lightHelper, gridHelper)
scene.add(ambientLight)
scene.add(torus);
scene.add(pointLight)

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x +=0.01
  torus.rotation.y +=0.01
  torus.rotation.z +=0.01

  controls.update();
  renderer.render(scene,camera);
}
animate();

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color:0xfffffff})
  const star = new THREE.Mesh(geometry, material)
  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))
  star.position.set(x,y,z);
  scene.add(star)
}
Array(200).fill().forEach(addStar)