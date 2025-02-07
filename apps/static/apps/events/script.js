// Particle.js configuration
particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false },
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
      modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } },
    },
    retina_detect: true,
  })
  
  // Form overlay and pagination
  document.addEventListener("DOMContentLoaded", () => {
    const joinButton = document.getElementById("joinChallenge")
    const formOverlay = document.getElementById("formOverlay")
    const closeBtn = document.querySelector(".close-btn")
    const form = document.getElementById("challengeForm")
    const formPages = document.querySelectorAll(".form-page")
    const prevBtn = document.querySelector(".prev-btn")
    const nextBtn = document.querySelector(".next-btn")
    const pagination = document.querySelector(".pagination")
  
    let currentPage = 1
  
    // Show/hide form overlay
    joinButton.addEventListener("click", (e) => {
      e.preventDefault()
      formOverlay.style.display = "block"
    })
  
    closeBtn.addEventListener("click", () => {
      formOverlay.style.display = "none"
    })
  
    // Create pagination dots
    formPages.forEach((_, index) => {
      const dot = document.createElement("div")
      dot.classList.add("pagination-dot")
      if (index === 0) dot.classList.add("active")
      pagination.appendChild(dot)
    })
  
    // Update form page visibility
    function showPage(pageNumber) {
      formPages.forEach((page, index) => {
        page.style.display = index + 1 === pageNumber ? "block" : "none"
      })
  
      // Update pagination dots
      const dots = document.querySelectorAll(".pagination-dot")
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index + 1 === pageNumber)
      })
  
      // Update button states
      prevBtn.disabled = pageNumber === 1
      nextBtn.textContent = pageNumber === formPages.length ? "Submit" : "Next"
    }
  
    // Navigation button click handlers
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--
        showPage(currentPage)
      }
    })
  
    nextBtn.addEventListener("click", () => {
      if (currentPage < formPages.length) {
        currentPage++
        showPage(currentPage)
      } else {
        form.submit()
      }
    })
  
    // Form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      // Here you would typically send the form data to a server
      alert("Form submitted successfully! Redirecting to payment...")
      formOverlay.style.display = "none"
    })
  
    // Initialize first page
    showPage(currentPage)
  
    // Scroll animation
    function animateOnScroll() {
      const elements = document.querySelectorAll(".fade-in")
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const windowHeight = window.innerHeight || document.documentElement.clientHeight
        if (rect.top <= windowHeight * 0.75) {
          el.classList.add("active")
        }
      })
    }
  
    window.addEventListener("scroll", animateOnScroll)
    window.addEventListener("load", animateOnScroll)
  
    // FAQ accordion
    const faqQuestions = document.querySelectorAll(".faq-question")
    faqQuestions.forEach((question) => {
      question.addEventListener("click", () => {
        const answer = question.nextElementSibling
        if (answer.style.display === "block") {
          answer.style.display = "none"
        } else {
          answer.style.display = "block"
        }
      })
    })
  
    // Mobile menu toggle
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      hamburger.classList.toggle("active")
    })
  
    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active")
        hamburger.classList.remove("active")
      })
    })
  })
  
  