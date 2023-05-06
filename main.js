import './style.css'
import * as THREE from 'three';
import { GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls"

import { handleLoadScreen } from './Utilities';
const loadingManager = new THREE.LoadingManager()

document.querySelector("#rect").style.height = 0

loadingManager.onProgress = () => handleLoadScreen()


var device = window.innerWidth < 968 ? "mobile" : "desktop"
const pi = Math.PI

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.set(28,35,25)
device == "desktop" ? camera.rotation.set(0, 0.95, 0):camera.rotation.set(0, 0.84, 0)

renderer.setClearColor( 0xffffff, 0);

const laptop = new URL("./assets/laptop/laptop.glb", import.meta.url)
const room = new URL("./assets/room/office.glb", import.meta.url)

const assetLoader = new GLTFLoader(loadingManager)
assetLoader.load(room.href, (gltf) => {
  const model = gltf.scene
  scene.add(model)
  device == "desktop" ? model.scale.set( 20, 20, 20) :  model.scale.set( 15, 15, 15) 
  model.position.set(0, 40, 0)
  
})
export var laptopLid
assetLoader.load(laptop.href, (gltf) => {
  const model = gltf.scene
  scene.add(model)
  laptopLid = model.children[0].children[0].children[0].children[0].children[1]
  console.log(laptopLid)
  model.rotation.y = pi / 2
  model.scale.set( 1, 1, 1) 
  device == "desktop" ? model.position.set(-13,4,1.5) :  model.position.set(-13,8,1.5)
})



const pointLight = new THREE.PointLight(0xff5733,1)
pointLight.position.set(-150,200,0)
scene.add(pointLight)
const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper)

const light1 = new THREE.PointLight( 0xfff5b6, 2, 80, 5);
light1.position.set( 0, 55, -9 );
scene.add( light1 );
const light2 = new THREE.PointLight( 0xfff5b6, 2, 80, 5);
light2.position.set( 0, 55, -0.3 );
scene.add( light2 );
const light3 = new THREE.PointLight( 0xfff5b6, 2, 80, 5);
light3.position.set( 0, 55, 8.5 );
scene.add( light3 );

// const lightH1 = new THREE.PointLightHelper(light1)
// const lightH2 = new THREE.PointLightHelper(light2)
// const lightH3 = new THREE.PointLightHelper(light3)
// scene.add(lightH1,lightH2,lightH3)


// const controls = new OrbitControls(camera, renderer.domElement)
var lastX, lastY
const rightWall = camera.rotation.y +0.05, leftWall = camera.rotation.y  -0.05
// const botWall = (camera.rotation.x - 5 + camera.rotation.z - 5) /2
// const topWall = (camera.rotation.x + 5 + camera.rotation.z + 5) /2
const handleMoveCamera = (e) => {
  if (lastX != e.pageX) {
    let t = e.pageX > lastX ? e.pageX : e.pageX * -1
    let newHorizon = camera.rotation.y + (t / 1000000)
    if (newHorizon >= leftWall && newHorizon <= rightWall) {
      camera.rotation.y = newHorizon
    }
  }
  // if (lastY != e.pageY) {
  //    let t = e.pageY > lastY ? e.pageY : e.pageY * -1
  //   let newHorizonX = (camera.rotation.x + (t / 1000000))
  //   let newHorizonZ = (camera.rotation.z + (t / 1000000))
  //   let newHorizon = (newHorizonX + newHorizonZ) / 2
  //   if (newHorizon >= botWall && newHorizon <= topWall) {
  //     camera.rotation.x = newHorizonX
  //     camera.rotation.z = newHorizonZ
  //   }
  // }
  lastX = e.pageX
  lastY = e.pageY
}
document.body.onmousemove = handleMoveCamera

function animate() {
  requestAnimationFrame(animate)
  // controls.update()
  if (laptopLid) {
    laptopLid.rotation.x += 0.01
    if (laptopLid.rotation.x / pi >= 1.5)  laptopLid.rotation.x -= pi / 1.5 
  }
  renderer.render(scene, camera)
  
}

animate()