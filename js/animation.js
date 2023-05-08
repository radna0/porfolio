import GSAP from "gsap";
import { ScrollTrigger } from "gsap/all";
GSAP.registerPlugin(ScrollTrigger);


ScrollTrigger.create({
    trigger: ".home",
    start: "center bottom",
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
ScrollTrigger.create({
    trigger: ".myResume",
    start: "center bottom",
    scrub: true,
    end: "bottom top",
    onToggle: (self) => {
        if (self.isActive) {
            document.querySelector(".myResume").style.animation = "myResumePop 1s ease"
            document.querySelector(".myResume").style.opacity = "1"
        } else {
            document.querySelector(".myResume").style.animation = ""
            document.querySelector(".myResume").style.opacity = "0"
        }
    },
})
ScrollTrigger.create({
    trigger: ".about",
    start: "top bottom",
    scrub: true,
    end: "bottom top",
    onToggle: (self) => {
        if (self.isActive) {
            document.querySelector(".aboutProfile").style.animation = "aboutProfileSlide 1s ease"
            document.querySelector(".aboutInfo").style.animation = "aboutInfoSlide 1s ease"
            document.querySelector(".aboutProfile").style.opacity = "1"
            document.querySelector(".aboutInfo").style.opacity = "1"
            document.querySelector(".aboutTitle").style.opacity = "1"
        } else {
            document.querySelector(".aboutProfile").style.opacity = "0"
            document.querySelector(".aboutInfo").style.opacity = "0"
            document.querySelector(".aboutProfile").style.animation = ""
            document.querySelector(".aboutInfo").style.animation = ""
            document.querySelector(".aboutTitle").style.opacity = "0"
            
        }
    },
})




let skillsIcons = GSAP.utils.toArray('.skillsContent .skillsDisplay img');

skillsIcons.forEach((icon,i) => {
    GSAP.to(icon, {
        scrollTrigger: {
            trigger: icon,
            start: 'center bottom',
            scrub: true,
            end: 'bottom top',
            onToggle: (self) => {
                if (self.isActive) {
                    icon.style.opacity = "1"
                    icon.style.animation = "IconSlide 1s ease"
                    if(!i) document.querySelector(".skillsTitle").style.opacity = "1"
                } else {
                    icon.style.opacity = "0"
                    icon.style.animation = ""
                    if (!i) document.querySelector(".skillsTitle").style.opacity = "0"
                }
            }
        }
    });
  
})

let goalsIcons = GSAP.utils.toArray('.goalsContent .skillsDisplay img');

goalsIcons.forEach((icon,i) => {
    GSAP.to(icon, {
        scrollTrigger: {
            trigger: icon,
            start: 'center bottom',
            scrub: true,
            end: 'bottom top',
            onToggle: (self) => {
                if (self.isActive) {
                    icon.style.opacity = "1"
                    icon.style.animation = "IconSlide 1s ease"
                    if(i) document.querySelector(".goalsTitle").style.opacity = "1"
                } else {
                    icon.style.opacity = "0"
                    icon.style.animation = ""
                    if(i) document.querySelector(".goalsTitle").style.opacity = "0"
                }
            }
        }
    });
  
})


let sections = GSAP.utils.toArray('.projectBox');

sections.forEach((section, i) => {
    GSAP.to(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            scrub: true,
            end: 'bottom top',
            onToggle: (self) => {
                if (self.isActive) {
                    section.style.opacity = "1"
                    section.style.animation = "projectBoxSlide 1s ease"
                    if(!i) document.querySelector(".projectsTitle").style.opacity = "1"
                } else {
                    section.style.opacity = "0"
                    section.style.animation = ""
                    if(!i) document.querySelector(".projectsTitle").style.opacity = "0"
                }
            }
        }
    });
  
})
let contacts = GSAP.utils.toArray('.contactDisplay');

contacts.forEach((contact, i) => {
    GSAP.to(contact, {
        scrollTrigger: {
            trigger: contact,
            start: 'top bottom',
            scrub: true,
            end: 'bottom top',
            onToggle: (self) => {
                if (self.isActive) {
                    contact.style.opacity = "1"
                } else {
                    contact.style.opacity = "0"
                }
            }
        }
    });
  
})




document.querySelector('a[href^="#"]').addEventListener("click",  function(e){
    e.preventDefault()
    document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior:"smooth"
    })
})