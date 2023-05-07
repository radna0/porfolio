import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { pi } from '../main';


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#info"),
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xcad2c5, 0);

camera.position.set(0,0,0)

const space = new URL("../assets/space/space.glb", import.meta.url)

const assetLoader = new GLTFLoader()
var spaceModel
assetLoader.load(space.href, (gltf) => {
    const model = gltf.scene
    spaceModel = model
    scene.add(model)
    model.scale.set(110, 110, 110)
    model.rotation.set(pi/2, pi /2, pi/2)
    model.position.set(145, 145, -175)
})


const handleMoveSpace = () => {
    let lastX
    let rightWall, leftWall
    const moveSpace = (e) => {
        if (!lastX) {
            rightWall = spaceModel.rotation.y + 0.1, leftWall = spaceModel.rotation.y - 0.1
        }
        if (lastX != e.pageX) {
            let t = e.pageX > lastX ? e.pageX : e.pageX * -1
            let newHorizon = spaceModel.rotation.y + (t / 5000000)
        if (newHorizon >= leftWall && newHorizon <= rightWall) {
            spaceModel.rotation.y = newHorizon
        }
    }
        lastX = e.pageX
    }

    return moveSpace
    
}
let closedMoveSpace
function animate() {
    requestAnimationFrame(animate)
    
    if (spaceModel) {
        if(!closedMoveSpace) closedMoveSpace = handleMoveSpace()
        document.querySelector(".home").onmousemove = closedMoveSpace
        
    }
    renderer.render(scene, camera)
}

animate()