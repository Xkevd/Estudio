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

// Cookie Consent Banner Logic (Uruguay Ley N° 18.331)
document.addEventListener("DOMContentLoaded", () => {
    // Check if consent has already been given
    const consent = localStorage.getItem("cookieConsent");
    
    // Check if we are on a nested page under /servicios/ or /servicios
    const isNested = window.location.pathname.includes("/servicios/");
    const cookiePolicyPath = isNested ? "../politica-de-cookies.html" : "politica-de-cookies.html";
    
    // Handle the cookie settings reset button if present on the policy page
    const resetBtn = document.getElementById("reset-cookies-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            localStorage.removeItem("cookieConsent");
            alert("Tus preferencias de cookies han sido restablecidas. El banner volverá a aparecer al recargar la página.");
            window.location.reload();
        });
    }

    if (consent) {
        return; // Don't show the banner if preference is already saved
    }

    // Inject CSS styles dynamically
    const style = document.createElement("style");
    style.innerHTML = `
        #cookie-consent-banner {
            position: fixed;
            bottom: 24px;
            right: 24px;
            max-width: 380px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(92, 61, 112, 0.2);
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            padding: 20px;
            z-index: 999999;
            font-family: 'Montserrat', sans-serif;
            animation: cookieSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        #cookie-consent-banner.hiding {
            animation: cookieSlideOut 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        #cookie-consent-banner h4 {
            margin: 0;
            font-size: 1.05rem;
            font-weight: 700;
            color: #5c3d70;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        #cookie-consent-banner p {
            margin: 0;
            font-size: 0.85rem;
            line-height: 1.5;
            color: #444;
            font-family: 'Montserrat', sans-serif;
            text-indent: 0 !important; /* Evitar sangría en layouts con PT Serif heredado */
        }

        #cookie-consent-banner a {
            color: #5c3d70;
            text-decoration: underline;
            font-weight: 600;
        }

        #cookie-consent-banner .cookie-buttons {
            display: flex;
            gap: 10px;
            margin-top: 4px;
        }

        #cookie-consent-banner button {
            flex: 1;
            padding: 9px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: 'Montserrat', sans-serif;
        }

        #cookie-consent-banner .btn-accept {
            background-color: #5c3d70;
            color: white;
            border: none;
        }

        #cookie-consent-banner .btn-accept:hover {
            background-color: #482f58;
            transform: translateY(-1px);
        }

        #cookie-consent-banner .btn-reject {
            background-color: transparent;
            color: #6b686d;
            border: 1px solid #dcdcdc;
        }

        #cookie-consent-banner .btn-reject:hover {
            background-color: rgba(0, 0, 0, 0.03);
            border-color: #c0c0c0;
        }

        @keyframes cookieSlideIn {
            from {
                transform: translateY(120px) scale(0.95);
                opacity: 0;
            }
            to {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
        }

        @keyframes cookieSlideOut {
            from {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            to {
                transform: translateY(120px) scale(0.95);
                opacity: 0;
            }
        }

        @media (max-width: 768px) {
            #cookie-consent-banner {
                bottom: 0;
                right: 0;
                left: 0;
                max-width: 100%;
                border-radius: 16px 16px 0 0;
                border: none;
                border-top: 1px solid rgba(92, 61, 112, 0.15);
                box-shadow: 0 -5px 25px rgba(0, 0, 0, 0.08);
                padding: 24px 20px;
                animation: cookieMobileSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            
            #cookie-consent-banner.hiding {
                animation: cookieMobileSlideOut 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            
            @keyframes cookieMobileSlideIn {
                from {
                    transform: translateY(100%);
                }
                to {
                    transform: translateY(0);
                }
            }

            @keyframes cookieMobileSlideOut {
                from {
                    transform: translateY(0);
                }
                to {
                    transform: translateY(100%);
                }
            }
        }
    `;
    document.head.appendChild(style);

    // Create Banner HTML
    const banner = document.createElement("div");
    banner.id = "cookie-consent-banner";
    banner.innerHTML = `
        <h4>🍪 Uso de Cookies</h4>
        <p>Utilizamos cookies para garantizar la seguridad del sitio y optimizar su experiencia de usuario. En cumplimiento con la Ley N° 18.331 de Uruguay, solicitamos su consentimiento para cookies no esenciales. Consulte nuestra <a href="${cookiePolicyPath}">Política de Cookies</a>.</p>
        <div class="cookie-buttons">
            <button class="btn-reject">Rechazar</button>
            <button class="btn-accept">Aceptar</button>
        </div>
    `;

    document.body.appendChild(banner);

    // Add event listeners
    const acceptBtn = banner.querySelector(".btn-accept");
    const rejectBtn = banner.querySelector(".btn-reject");

    const hideBanner = (decision) => {
        localStorage.setItem("cookieConsent", decision);
        banner.classList.add("hiding");
        setTimeout(() => {
            banner.remove();
        }, 400);
    };

    acceptBtn.addEventListener("click", () => hideBanner("accepted"));
    rejectBtn.addEventListener("click", () => hideBanner("rejected"));
});

// Dynamic footer cookie link injection
document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector("footer");
    if (footer) {
        const isNested = window.location.pathname.includes("/servicios/");
        const cookiePolicyPath = isNested ? "../politica-de-cookies.html" : "politica-de-cookies.html";

        // Create footer link wrapper
        const cookieLinkDiv = document.createElement("div");
        cookieLinkDiv.id = "footer-cookie-link";
        cookieLinkDiv.innerHTML = `<a href="${cookiePolicyPath}">Política de Cookies</a>`;
        
        // Style it to match the footer theme
        const style = document.createElement("style");
        style.innerHTML = `
            #footer-cookie-link a {
                color: #5c3d70;
                font-family: 'Montserrat', sans-serif;
                font-size: 1rem;
                font-weight: 600;
                text-decoration: none;
                transition: opacity 0.2s ease;
            }
            #footer-cookie-link a:hover {
                opacity: 0.8;
                text-decoration: underline;
            }
            @media (max-width: 999px) {
                #footer-cookie-link a {
                    font-size: 0.4rem;
                }
            }
        `;
        document.head.appendChild(style);

        // Insert before #footer-social if present, otherwise append
        const social = document.getElementById("footer-social");
        if (social) {
            footer.insertBefore(cookieLinkDiv, social);
        } else {
            footer.appendChild(cookieLinkDiv);
        }
    }
});