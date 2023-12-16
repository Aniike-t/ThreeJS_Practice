import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import planetImg from './assets/planet_img.jpg';
import sunImg from './assets/sun_img.jpg';
import sunNormal from './assets/sun_normal.png';




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,10000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);

//const pointLight = new THREE.PointLight(0xffffff,1000)
// const ambientLight = new THREE.AmbientLight(0xffffff,1);
//pointLight.position.set(10,10,10);
//scene.add(pointLight, ambientLight);
//const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)
scene.add(gridHelper)
//scene.add(lightHelper)
//scene.add(ambientLight)



const sun = new THREE.Mesh(
  new THREE.SphereGeometry(7,32,32),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(sunImg, function (texture) {
      texture.minFilter = THREE.NearestFilter; 
      texture.magFilter = THREE.NearestFilter; 
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy(); 
    }),
    normalMap: new THREE.TextureLoader().load(sunNormal, function (texture) {
      texture.minFilter = THREE.NearestFilter;
      texture.magFilter = THREE.NearestFilter;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    }),
    emissiveMap: new THREE.TextureLoader().load(sunImg), 
    emissive: new THREE.Color(0xffff00), 
    emissiveIntensity: 1,
    side: THREE.DoubleSide, 
  })
)
sun.rotation.x = Math.PI / 8
scene.add(sun)


const planet = new THREE.Mesh(
  new THREE.SphereGeometry(2,32,32),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(planetImg),
    normalMap: new THREE.TextureLoader().load(sunNormal) //uisng same normal for planet
  })
)
planet.rotation.x = Math.PI / 8
scene.add(planet)


let theta =0
let phi =0
let planetPointLight = new THREE.PointLight(0xffffff,100)
scene.add(planetPointLight)
let planetLightHelper = new THREE.PointLightHelper(planetPointLight)
//scene.add(planetLightHelper)
function revovle(){
  let radius=40
  theta += 0.002
  phi += 0.002
  planet.position.x = radius * Math.cos(theta)
  planet.position.z = radius * Math.sin(theta)
  planet.position.y = radius * Math.sin(phi)
  planet.rotation.x += 0.01 
  planetPointLight.position.set((radius-8)*Math.cos(theta),(radius-8)*Math.sin(theta),(radius-8)*Math.sin(phi))
}


const planetMoon = new THREE.Mesh(
  new THREE.SphereGeometry(0.6,16,16),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(planetImg),
    normalMap: new THREE.TextureLoader().load(sunNormal),
  })
)

planetMoon.rotation.x = Math.PI / 8
scene.add(planetMoon)
let Mtheta= 0
let Mphi= 0
function MoonRevolve(){
  let Mradius=4
  Mtheta += 0.01
  Mphi += 0.01
  planetMoon.position.x = planet.position.x+(Mradius * Math.cos(Mtheta))
  planetMoon.position.z = planet.position.y+(Mradius * Math.sin(Mtheta))
  planetMoon.position.y = planet.position.z+(Mradius * Math.sin(Mphi))
  planetMoon.rotation.x += 0.01 
}


function Animate(){
  requestAnimationFrame(Animate);
  controls.update()
  sun.rotation.y+=0.005
  revovle()
  MoonRevolve()
  renderer.render(scene, camera);
}
Animate()