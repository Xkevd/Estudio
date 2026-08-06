// Scrolling function
var x = window.matchMedia("(min-width: 999px)")
var y = window.matchMedia("(max-width: 999px)")

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (x.matches) {
        if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
            document.querySelector("#logoandtitle img").style.height = "4rem";
            document.querySelector("#logoandtitle h2").style.fontSize = "1rem";
            document.querySelector("#logoandtitle h1").style.fontSize = "0.5rem";
            document.querySelector("#header").style.height = "fit-content";
            document.querySelector("#header").style.padding = "0.5rem";
            document.querySelector("#header").style.backgroundColor = "#f3f1f5c0";
            document.querySelector("#header").style.backdropFilter = "blur(20px)";

        } else {
            document.querySelector("#logoandtitle img").style.height = "8rem";
            document.querySelector("#logoandtitle h2").style.fontSize = "1.5rem";
            document.querySelector("#logoandtitle h1").style.fontSize = "0.9rem";
            document.querySelector("#header").style.height = "9rem";
            document.querySelector("#header").style.padding = "2rem";
            document.querySelector("#header").style.backgroundColor = "transparent";
            document.querySelector("#header").style.backdropFilter = "blur(0px)";
        }
    }
}
const parentElement = document.getElementById("header")

function celphoneView() {
    if (y.matches) {
        parentElement.style.position = "absolute";
    } else {
        parentElement.style.position = "fixed";
    }
}

celphoneView()


// Menu open/close
const menuButton = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");

function changeClass() {
    let elementAtribute = menu.className;
    console.log('clicked')
    if (elementAtribute == "hidden") {
        menu.className = "show";
        console.log(menu.className)
    } else {
        menu.className = "hidden";
        console.log(menu.className)
    }
}

menuButton.addEventListener('click', changeClass);

// Highlight active page in navigation bar
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname.replace(/\\/g, "/");
    const page = path.split("/").pop();
    const navLinks = document.querySelectorAll("#menu a");

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;
        const linkPage = href.split("/").pop();
        
        if (page === linkPage) {
            link.classList.add("active");
        } else if ((page === "" || page === "index.html") && linkPage === "index.html") {
            // Match home page correctly (including root path)
            link.classList.add("active");
        } else if (path.includes("/servicios/") && linkPage === "servicios.html") {
            // Highlight SERVICIOS for sub-pages under the servicios sub-directory
            link.classList.add("active");
        }
    });
});