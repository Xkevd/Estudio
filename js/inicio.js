// Scrolling function
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
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