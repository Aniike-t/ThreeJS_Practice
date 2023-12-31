

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
const pointLight = new THREE.PointLight(0xffffff,100)
const ambientLight = new THREE.AmbientLight(0xffffff);
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('assets/moon.jpg'),
    normalMap: new THREE.TextureLoader().load('assets/normal.jpg')
  })
)

scene.add(moon)

pointLight.position.set(5,5,5)
scene.add(lightHelper, gridHelper)
scene.add(ambientLight)
scene.add(torus);
scene.add(pointLight)
scene.background = new THREE.Color(0x000000);
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
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh(geometry, material)
  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))
  star.position.set(x,y,z);
  scene.add(star)
}
Array(200).fill().forEach(addStar)

moon.position.setZ(30);
moon.position.setX(-10);
pointLight.position.setZ(35);
pointLight.position.setX(-7)
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;
  camera.position.z =t * -0.01;
  camera.position.x =t * -0.005;
  camera.position.y =t * -0.005;
}
document.body.onscroll = moveCamera