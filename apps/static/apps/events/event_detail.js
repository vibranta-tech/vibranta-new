// const paymentUrl = "{% url 'payment' %}";
// const verifyPaymentUrl = "{% url 'verify_payment' %}";
// const event_id=1
// const event_amount={{event.price}}
// const datetime = {{event.datetime}}


console.log(datetime)
// Particle.js configuration
particlesJS("particles-js", {
    particles: {
      number: { value: 110, density: { enable: true, value_area: 800 } },
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

    const closeBtn = document.querySelector(".close-btn");
    const form = document.getElementById("challengeForm");
    const formPages = document.querySelectorAll(".form-page");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const pagination = document.querySelector(".pagination");
  
    //countdown
    function createCountdown() {
      const elements = {
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds"),
      };
  
      const eventDate = new Date(datetime).getTime();
      let interval;
  
      function update() {
        const now = Date.now();
        const diff = eventDate - now;
  
        if (diff <= 0) {
          document.querySelector(".countdown-text").innerHTML = "🎉 WE'RE LIVE!";
          document.querySelector(".countdown-text").style.animation =
            "party-glitch 0.5s infinite";
          clearInterval(interval);
          return;
        }
  
        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
  
        updateDigit(elements.days, days);
        updateDigit(elements.hours, hours.toString().padStart(2, "0"));
        updateDigit(elements.minutes, minutes.toString().padStart(2, "0"));
        updateDigit(elements.seconds, seconds.toString().padStart(2, "0"));
      }
  
      function updateDigit(element, newValue) {
        if (element.textContent !== newValue) {
          element.classList.add("flip-animation");
          setTimeout(() => {
            element.textContent = newValue;
            element.classList.remove("flip-animation");
          }, 300);
        }
      }
  
      function initialize() {
        update();
        interval = setInterval(update, 1000);
      }
  
      window.addEventListener("beforeunload", () => {
        clearInterval(interval);
      });
  
      initialize();
    }
  
    createCountdown();
  

  
    // Scroll animation
    function animateOnScroll() {
      const elements = document.querySelectorAll(".fade-in");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= windowHeight * 0.75) {
          el.classList.add("active");
        }
      });
    }
  
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
  