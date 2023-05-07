import GSAP from "gsap";
import { ScrollTrigger } from "gsap/all";
GSAP.registerPlugin(ScrollTrigger);



ScrollTrigger.create( {
    trigger: ".home",
    start: "top center",
    scrub: true,
    end: "bottom top",
    onToggle: (self) => {
        if (self.isActive) {
            document.querySelector(".homeTitle").style.animation = "homeTitleSlide 1s ease"
        } else {
            document.querySelector(".homeTitle").style.animation = ""
        }
    },
})
ScrollTrigger.create( {
    trigger: ".about",
    start: "center center",
    scrub: true,
    end: "bottom top",
    onToggle: (self) => {
        if (self.isActive) {
            document.querySelector(".aboutProfile").style.animation = "aboutProfileSlide 1s ease"
            document.querySelector(".aboutInfo").style.animation = "aboutInfoSlide 1s ease"
            document.querySelector(".aboutProfile").style.opacity = "1"
            document.querySelector(".aboutInfo").style.opacity = "1"
        } else {
            document.querySelector(".aboutProfile").style.opacity = "0"
            document.querySelector(".aboutInfo").style.opacity = "0"
            document.querySelector(".aboutProfile").style.animation = ""
            document.querySelector(".aboutInfo").style.animation = ""
            
        }
    },
})


var sections = GSAP.utils.toArray('.projectBox');

sections.forEach((section) => {
  
    GSAP.to(section, {
        scrollTrigger: {
            trigger: ".projects",
            start: 'top center',
            scrub: true,
            end: 'bottom top',
            onToggle: (self) => {
                if (self.isActive) {
                    section.style.opacity = "1"
                    section.style.animation = "projectBoxSlide 1s ease"
                } else {
                    section.style.opacity = "0"
                    section.style.animation = ""
                }
            }
        }
    });
  
})
