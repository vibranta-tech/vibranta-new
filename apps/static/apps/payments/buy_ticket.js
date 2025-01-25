
// Get DOM elements
const registerBtn = document.querySelector('#register-btn');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');
const form = document.getElementById('infoForm');

// Show popup when register button is clicked
registerBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

// Hide popup when close button is clicked
closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
});

// Hide popup when clicking outside
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});

/*
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }); 

*/