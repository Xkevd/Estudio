// Scrolling function
var x = window.matchMedia("(min-width: 999px)")
var y = window.matchMedia("(max-width: 999px)")

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (x.matches){
        if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40){
            document.querySelector("#logoandtitle img").style.height = "4rem";
            document.querySelector("#logoandtitle h2").style.fontSize = "1rem";
            document.querySelector("#logoandtitle h1").style.fontSize = "0.5rem";
            document.querySelector("#header").style.height = "fit-content";
            document.querySelector("#header").style.padding = "0.5rem";
    
      
        }else{
            document.querySelector("#logoandtitle img").style.height = "8rem";
            document.querySelector("#logoandtitle h2").style.fontSize = "1.5rem";
            document.querySelector("#logoandtitle h1").style.fontSize = "0.9rem";
            document.querySelector("#header").style.height = "9rem";
            document.querySelector("#header").style.padding = "2rem";
        }
    }
}
const parentElement = document.getElementById("header")

function celphoneView(){
    if (y.matches){
            parentElement.style.position = "absolute";
    }else{
       parentElement.style.position = "fixed";
    }
}

celphoneView()


// Menu open/close

function changeClass(element){
    let elementAtribute = element.className;
    if (elementAtribute == "hidden"){
        navBar.className = "show";
        console.log(navBar.className)
    }else{
        navBar.className = "hidden"; 
        console.log(navBar.className)
    }
}

const navBar = document.querySelector("#nav-bar ul");
const navClick = document.querySelector("#nav-bar span");


navClick.addEventListener("click", changeClass(navBar));