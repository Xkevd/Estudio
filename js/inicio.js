// Scrolling function
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        document.querySelector("#header-social").style.display = "none";
        document.querySelector("#logoandtitle img").style.height = "4rem";
        document.querySelector("#logoandtitle h2").style.fontSize = "1rem";

        
    }else{
        document.querySelector("#header-social").style.display = "inline";
        document.querySelector("#logoandtitle img").style.height = "8rem";
        document.querySelector("#logoandtitle h2").style.fontSize = "1.5rem";
    }

}