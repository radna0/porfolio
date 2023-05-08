import { camera, handleMoveCamera, laptopLid, pi, scene } from "../main"
import GSAP from "gsap";
export const handleLoadScreen = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            //logo transition
            document.querySelector("#svg").style.height = '2vw'
            document.querySelector("#svg").style.opacity = 0
            //container transition
            document.querySelector("#container").style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
            resolve()
        }, 2300)
    })
}

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
        .to(
            camera.position,
            {
                x: camera.position.x - 20,
                y: camera.position.y - 4,
                z: camera.position.z - 10,
                duration: 2
            }
        )
        .to(
            camera.position,
            {
                x: camera.position.x - 30,
                y: camera.position.y - 8,
                z: camera.position.z - 25,
                ease:"power1.out",
                duration: 3
            },
            "laptop-opening"
        )
        .to(
            camera.rotation,
            {
                x: 0,
                y: camera.rotation.y - 2.50105,
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
                    // document.querySelector("#bg").onClick = () =>  false
                    await removeObject()
                    document.querySelector("#container").style.display = "none"
                    document.querySelector("#contentContainer").style.opacity = "1"
                    document.querySelector(".homeTitle").style.animation = "homeTitleSlide 1s ease"
                    document.querySelector("#contentContainer").style.pointerEvents = "all"
                    document.body.style.overflow = "auto"
                    resolve()
                }
            }
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