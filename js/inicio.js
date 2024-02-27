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
const menuButton = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");

function changeClass(){
    let elementAtribute = menu.className;
    console.log('clicked')
    if (elementAtribute == "hidden"){
        menu.className = "show";
        console.log(menu.className)
    }else{
        menu.className = "hidden"; 
        console.log(menu.className)
    }
}

menuButton.addEventListener('click', changeClass);