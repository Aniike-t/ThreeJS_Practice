import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg')
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth,window.innerHeight)


const pointLight = new THREE.PointLight(0xffffff,200)
const ambientLight = new THREE.AmbientLight(0xffffff);
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)
pointLight.position.set(20,20,20);

scene.add(gridHelper)
scene.add(pointLight)
//scene.add(lightHelper)

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color:0xFF6347})
const torus = new THREE.Mesh(geometry,material)
scene.add(torus)

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.setZ(50);
camera.position.setX(50);
camera.position.setY(20);

let radius = 50
let instanceVal = 0;
let polarangle = 0
let camRadius= 20

function animate(){
  requestAnimationFrame(animate);
  controls.update()
  instanceVal+=0.01
  polarangle+=0.01
  if(instanceVal===6.28){
    instanceVal=0;
  }
  if(polarangle===3.14){
    polarangle=0;
  }
  pointLight.position.set(
    camRadius * Math.cos(instanceVal) * Math.sin(polarangle),
    camRadius * Math.sin(instanceVal) * Math.sin(polarangle),
    camRadius * Math.cos(polarangle)
  );
  camera.position.setX(radius*Math.cos(instanceVal))
  camera.position.setZ(radius*Math.sin(instanceVal))
  rotateTorus()
  renderer.render(scene,camera);
}
animate();


function rotateTorus() {

  const cameraY = camera.position.y;
  const cameraZ = camera.position.z;

  torus.rotation.x += 0.0006 * cameraY;
  torus.rotation.y += 0.0006 * cameraY;
  torus.rotation.z += 0.0006 * cameraZ;

}

