const hamburger = document.querySelector(".hamburger")
const navLinks = document.querySelector(".mobile-menu")

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    hamburger.classList.toggle("active")
})

