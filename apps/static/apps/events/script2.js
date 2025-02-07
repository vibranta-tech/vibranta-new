// Particle.js configuration
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { particles_nb: 4 },
    },
  },
  retina_detect: true,
});

// Form overlay and pagination
document.addEventListener("DOMContentLoaded", () => {
  const joinButton = document.getElementById("joinChallenge");
  const formOverlay = document.getElementById("formOverlay");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("challengeForm");
  const formPages = document.querySelectorAll(".form-page");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const pagination = document.querySelector(".pagination");

  // Updated JavaScript
  function createCountdown() {
    const elements = {
      days: document.getElementById("days"),
      hours: document.getElementById("hours"),
      minutes: document.getElementById("minutes"),
      seconds: document.getElementById("seconds"),
    };

    const eventDate = new Date("2025-02-22T09:00:00Z").getTime();
    let animationFrame;

    function update() {
      const now = Date.now();
      const diff = eventDate - now;

      if (diff < 0) {
        document.querySelector(".countdown-text").innerHTML = "🎉 WE'RE LIVE!";
        document.querySelector(".countdown-text").style.animation =
          "party-glitch 0.5s infinite";
        return;
      }

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      animateDigit(elements.days, days);
      animateDigit(elements.hours, hours.toString().padStart(2, "0"));
      animateDigit(elements.minutes, minutes.toString().padStart(2, "0"));
      animateDigit(elements.seconds, seconds.toString().padStart(2, "0"));

      animationFrame = requestAnimationFrame(update);
    }

    function animateDigit(element, newValue) {
      if (element.textContent !== newValue) {
        element.style.transform = "rotateX(90deg)";
        setTimeout(() => {
          element.textContent = newValue;
          element.style.transform = "rotateX(0deg)";
        }, 200);
      }
    }

    // Start the countdown
    update();

    // Cleanup
    return () => cancelAnimationFrame(animationFrame);
  }
  // Initialize countdown
  createCountdown();

  let currentPage = 1;


  // Scroll animation
  function animateOnScroll() {
    const elements = document.querySelectorAll(".fade-in");
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
    elements.forEach((el) => {
      if (el.classList.contains("active")) return; // Skip if already active
  
      const rect = el.getBoundingClientRect();
      if (rect.top <= windowHeight * 0.75) {
        el.classList.add("active");
      }
    });
  }
  
  // Run on scroll and initial load
  window.addEventListener("scroll", animateOnScroll);
  window.addEventListener("load", animateOnScroll);

  // FAQ accordion
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      if (answer.style.display === "block") {
        answer.style.display = "none";
      } else {
        answer.style.display = "block";
      }
    });
  });

  
});
