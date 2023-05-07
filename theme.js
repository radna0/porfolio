import { scene } from "./main"
import * as THREE from 'three';
import GSAP from "gsap";


const SwitchTheme = () => {
    const themeTimeline = new GSAP.timeline()
    if (theme === "dark") {
        themeTimeline.to(sunLight.color, {
            r: 29 / 255,
            g: 25 / 255,
            b: 54 / 255,
            duration: 1
        }, "same")
        .to(sunLight, {
            intensity: 10,
            duration: 1.5
        }, "same")
        .to(light1, {
            intensity: 2,
            duration: 1.5
        }, "same")
        .to(light2, {
            intensity: 2,
            duration: 1.5
        }, "same")
        .to(light3, {
            intensity: 2,
            duration: 1.5
        }, "same");
    } else {
        themeTimeline.to(sunLight.color, {
            r: 255 / 255,
            g: 255 / 255,
            b: 255 / 255,
            duration: 1
        }, "same")
        .to(sunLight, {
            intensity: 1,
            duration: 1.5
        }, "same")
        .to(light1, {
            intensity: 0,
            duration: 1.5
        }, "same")
        .to(light2, {
            intensity: 0,
            duration: 1.5
        }, "same")
        .to(light3, {
            intensity: 0,
            duration: 1.5
        }, "same");
    }
}

const handleToggleTheme = () => {
    toggleCircle.classList.toggle("slide");
    theme = theme === "light" ? "dark" : "light";
    document.body.classList.toggle("darkTheme");
    document.body.classList.toggle("lightTheme");
    SwitchTheme()
}

const sunLight = new THREE.PointLight("rgb(255,255,255)", 1)
// night : 0x584d9f, 10 | day : 0xff5733, 1
sunLight.position.set(-150,200,0)
scene.add(sunLight)

const light1 = new THREE.PointLight( 0xfff5b6, 0, 80, 5);
const light2 = new THREE.PointLight( 0xfff5b6, 0, 80, 5);
const light3 = new THREE.PointLight( 0xfff5b6, 0, 80, 5);
light2.position.set( 0, 55, -0.3 );
light1.position.set( 0, 55, -9 );
light3.position.set( 0, 55, 8.5 );
scene.add( light1, light2, light3 );
// const lightH1 = new THREE.PointLightHelper(light1)
// const lightH2 = new THREE.PointLightHelper(light2)
// const lightH3 = new THREE.PointLightHelper(light3)
// scene.add(lightH1,lightH2,lightH3)

let theme = "light"
let toggleButton = document.querySelector(".toggleButton")
let toggleCircle = document.querySelector(".toggleCircle")


toggleButton.addEventListener("click", handleToggleTheme)

