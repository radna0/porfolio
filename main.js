import './style.css'
import * as THREE from 'three';
import "./js/animation"
import { GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import { handleLoadScreen, handleOnScrollOnce } from './js/utilities';
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls"

export const device = window.innerWidth < 968 ? "mobile" : "desktop"
export const pi = Math.PI
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
export const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor( 0xcad2c5, 0);

camera.position.set(28,35,25)
device == "desktop" ? camera.rotation.set(0, 0.95, 0):camera.rotation.set(0, 0.84, 0)


const laptop = new URL("./assets/laptop/laptop.glb", import.meta.url)
const room = new URL("./assets/room/office.glb", import.meta.url)
const loadingManager = new THREE.LoadingManager()

document.querySelector("#rect").style.height = 0
document.querySelector("#bg").style.opacity = 0
loadingManager.onLoad = async() => {
  await handleLoadScreen()
  document.querySelector("#bg").style.opacity = 1
  window.addEventListener("wheel", handleOnScrollOnce)
}

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
  model.rotation.y = pi / 2
  model.scale.set( 1, 1, 1) 
  device == "desktop" ? model.position.set(-13,4,1.5) :  model.position.set(-13,8,1.5)
})


var lastX, lastY
const rightWall = camera.rotation.y +0.05, leftWall = camera.rotation.y  -0.05
// const botWall = (camera.rotation.x - 5 + camera.rotation.z - 5) /2
// const topWall = (camera.rotation.x + 5 + camera.rotation.z + 5) /2
export const handleMoveCamera = (e) => {
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
// const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
  requestAnimationFrame(animate)
  // controls.update()
  renderer.render(scene, camera)
  
}

animate()