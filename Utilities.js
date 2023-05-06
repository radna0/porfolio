import { laptopLid } from "./main"

export const handleLoadScreen = () => {
    setTimeout(() => {
    //logo transition
        document.querySelector("#svg").style.height = '2vw'
        document.querySelector("#svg").style.opacity = 0
        //container transition
        document.querySelector("#container").style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
        // Add Scroll Once Event
        window.addEventListener("wheel", handleOnScrollOnce)
    }, 2300)
}

const handleOnScrollOnce = (e) => {
    if (e.deltaY > 0) {
        window.removeEventListener("wheel", handleOnScrollOnce)
        console.log("wheeldown")

    }

}