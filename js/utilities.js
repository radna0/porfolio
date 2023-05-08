import { camera, device, laptopLid, pi, scene } from "../main"
import GSAP from "gsap";

export const handleOnScrollOnce = async (e) => {
    if (e.deltaY > 0) {
        window.removeEventListener("wheel", handleOnScrollOnce)
        document.body.onmousemove = null
        document.querySelector(".arrowSVGWrapper").style.opacity = 0
        document.querySelector(".toggleBar").style.opacity = 0
        await animateIntro()
    }

}
const animateIntro = () => {
    return new Promise((resolve) => {
        const animateTimeline = new GSAP.timeline()
        animateTimeline
            .to(camera.rotation, {
                y: device == "desktop" ? 0.95 : 0.84,
                ease:"power1.out",
                duration: 1
        }, )
        .to(
            camera.position,
            {
                x: camera.position.x - 20,
                y: camera.position.y - 4,
                z: camera.position.z - 10,
                duration: 2
            }, "move"
        )
        .to(
            camera.position,
            {
                x: device == "desktop" ?  camera.position.x - 30 : camera.position.x - 33,
                y: camera.position.y - 8,
                z: device == "desktop" ? camera.position.z - 25 : camera.position.z - 26,
                ease:"power1.out",
                duration: 3
            },
            "laptop-opening"
        )
        .to(
            camera.rotation,
            {
                x: 0,
                y: device == "desktop" ?  0.95- 2.50105 : 0.84- 2.50105,
                z: -0.000625,
                duration: 3,
                ease:"power1.out",
            },
            "laptop-opening"
            )
            .to(
                laptopLid.rotation,
                {
                    x: pi * 1.33,
                    duration: 2,
                    
                },
                "laptop-opening"
                )
                .to(
            camera.position,
            {
                x: camera.position.x - 28,
                ease:"power1.out",
                duration: 1,
                onComplete: async () => {
                    document.body.style.backgroundColor = "#121619"
                    document.querySelector("#bg").style.transition = "all 0.5s ease"
                    document.querySelector("#bg").style.opacity = 0
                    window.scrollTo({ top: document.querySelector("#contentContainer"), behavior: 'smooth'});
                    await removeObject()
                    document.querySelector("#container").style.display = "none"
                    document.querySelector(".homeTitle").style.animation = "homeTitleSlide 1s ease"
                    document.querySelector("#contentContainer").style.pointerEvents = "all"
                    document.querySelector("#contentContainer").style.height = "100%"
                    document.querySelector("#contentContainer").style.opacity = "1"
                    document.body.style.overflow = "auto"
                    resolve()
                }
            }, "pivot"
            )
            })
        }
        
const removeObject = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const allObjects = scene.children
            // scene.children = []
            document.querySelector("#bg").style.display = "none"
            resolve()
        }, 1000)
    })
}