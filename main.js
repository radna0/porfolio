import './style.css'

import * as THREE from 'three';
import { GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls"

const pi = Math.PI

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
// x: -6.563169942883159, y: 34.311330683740664, z: -0.3769711269162619
camera.position.x = -10
camera.position.y = 35
camera.position.z = 0
//  _x: -1.5757808574177556, _y: -0.4244012505830198, _z: -1.5829008152822917
camera.rotation.x = - pi / 2
camera.rotation.y = -0.4
camera.rotation.z = - pi / 2
renderer.setClearColor( 0xffffff, 0);

const laptop = new URL("./assets/laptop/laptop.glb", import.meta.url)
const room = new URL("./assets/room/office.glb", import.meta.url)

const assetLoader = new GLTFLoader()
var mixer
assetLoader.load(laptop.href, (gltf) => {
  const model = gltf.scene
  scene.add(model)
  model.rotation.y = pi / 2
  model.position.set(-13,4,1.5)
  mixer = new THREE.AnimationMixer(model)
  const clips = gltf.animations
  const clip = THREE.AnimationClip.findByName(clips, "Scene")
  const action = mixer.clipAction(clip)
  action.play()
})
assetLoader.load(room.href, (gltf) => {
  const model = gltf.scene
  scene.add(model)
  model.scale.x = 20
  model.scale.y = 20
  model.scale.z = 20
  model.position.set(0,40,0)
})


const pointLight = new THREE.PointLight(0xffffff,0)
pointLight.position.set(50,30,0)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight,ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)
scene.add(lightHelper,gridHelper)


// const controls = new OrbitControls(camera, renderer.domElement)

const clock = new THREE.Clock()
function animate() {
  requestAnimationFrame(animate)
  if (mixer)
      mixer.update(clock.getDelta())
  
  // console.log(controls)
  // controls.update()
  renderer.render(scene,camera)
}

animate()