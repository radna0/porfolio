import './style.css'

import * as THREE from 'three';
import { GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls"


const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)


const geometry = new THREE.TorusGeometry(10, 3, 16, 100)

const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 })

const torus = new THREE.Mesh(geometry, material)

const book = new URL("./assets/book/scene.gltf", import.meta.url)
const candlestick = new URL("./assets/candlestick/scene.gltf", import.meta.url)
const inkBottle = new URL("./assets/ink_bottle/scene.gltf", import.meta.url)
const woodenTable = new URL("./assets/wooden_table/scene.gltf", import.meta.url)


const assetLoader = new GLTFLoader()

assetLoader.load(book.href, (gltf) => {
  const model = gltf.scene
  model.scale.x = 5
  model.scale.y = 5
  model.scale.z = 5
  model.rotation.y = 3.14 / 2
  scene.add(model)
  model.position.set(10,17.4,-33)
})
assetLoader.load(candlestick.href, (gltf) => {
  const model = gltf.scene
  model.scale.x = 0.01
  model.scale.y = 0.01
  model.scale.z = 0.01
  scene.add(model)
  model.position.set(3,16.7,-18)
})
// assetLoader.load(inkBottle.href, (gltf) => {
//   const model = gltf.scene
//   model.scale.x = 70
//   model.scale.y = 70
//   model.scale.z = 70
//   model.rotation.y = 2.5
//   scene.add(model)
//   model.position.set(13,18.2,-15)
// })
assetLoader.load(woodenTable.href, (gltf) => {
  const model = gltf.scene
  model.scale.x = 10
  model.scale.y = 10
  model.scale.z = 10 
  scene.add(model)
  model.position.set(0,0,0)
})

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(3,24,-18)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(10000,50)
scene.add(lightHelper,gridHelper)




const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
  requestAnimationFrame(animate)
  
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01
  controls.update()
  renderer.render(scene,camera)
}

animate()