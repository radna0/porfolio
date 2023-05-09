import './style.css'
import * as THREE from 'three';
import "./js/animation"
import { GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import {  handleOnScrollOnce } from './js/utilities';

export let device = window.innerWidth < 968 ? "mobile" : "desktop"
export const pi = Math.PI
export let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
export const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor( 0xcad2c5, 0);
device == "desktop" ? camera.position.set(28,35,25)  :  camera.position.set(28,39,25)
device == "desktop" ? camera.rotation.set(0, 0.95, 0) : camera.rotation.set(0, 0.84, 0)



document.querySelector("#bg").style.opacity = 0
const progressBar = document.querySelector("#progress")

const loadingManager = new THREE.LoadingManager()
loadingManager.onProgress = (url, loaded, total) => {
  progressBar.value = (loaded / total) * 100 > progressBar.value ? (loaded / total) * 100 : progressBar.value
  
}
loadingManager.onLoad = async () => {
  document.querySelector("#container").style.opacity = 0
  document.querySelector(".arrowSVGWrapper").style.opacity = 1
  document.querySelector(".toggleBar").style.opacity = 1
  document.querySelector("#bg").style.opacity = 1
  window.addEventListener("wheel", handleOnScrollOnce)
}

const assetLoader = new GLTFLoader(loadingManager)

const laptop = new URL("./assets/laptop/laptop.glb", import.meta.url)
const room = new URL("./assets/room/office.glb", import.meta.url)


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


var lastX
let rightWall = device == "desktop" ? camera.rotation.y + 0.1 : camera.rotation.y + 0.5,
  leftWall = device == "desktop" ? camera.rotation.y - 0.1 : camera.rotation.y - 0.5

export const handleMoveCamera = (e) => {
  if (lastX != e.pageX) {
    let t = e.pageX > lastX ? e.pageX : e.pageX * -1
    let add = device == "desktop" ? (t / 1000000) : (t / 50000)
    let newHorizon = camera.rotation.y + add
    if (newHorizon >= leftWall && newHorizon <= rightWall) {
      camera.rotation.y = newHorizon
    }
  }
  lastX = e.pageX
}
document.body.onmousemove = handleMoveCamera

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  
}

animate()



