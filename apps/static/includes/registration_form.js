
const PRICE_PER_MEMBER = 100;
let currentStudent = 0;
let totalStudents = 1;
let studentForms = [];

const modal = document.getElementById('formModal');
const openFormBtn = document.getElementById('openFormBtn');
const eventPage = document.getElementById('eventPage');
const studentPage = document.getElementById('studentPage');
const numMembersSelect = document.getElementById('numMembers');
const totalPriceSpan = document.getElementById('totalPrice');
const eventNextBtn = document.getElementById('eventNextBtn');
const backBtn = document.getElementById('backBtn');
const submitBtn = document.getElementById('submitBtn');
const studentForm = document.getElementById('studentForm');
const studentFormTitle = document.getElementById('studentFormTitle');


async function sendPostRequest(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken() // CSRF token function
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("API Error:", error);
        return { status: "error", message: error.message };
    }
}



openFormBtn.onclick = () => {
   
    modal.classList.toggle("active")
    setTimeout(100)
    // setTimeout(() => modal.querySelector('.modal-content').style.opacity = '1', 50);
};

window.onclick = (event) => {
    if (event.target == modal) {
        modal.classList.remove("active")
        // modal.querySelector('.modal-content').style.opacity = '0';
        // setTimeout(() => modal.style.display = 'none', 300);
    }
};

numMembersSelect.onchange = () => {
    totalStudents = parseInt(numMembersSelect.value);
    totalPriceSpan.textContent = totalStudents * PRICE_PER_MEMBER;
};

eventNextBtn.onclick = () => {
    eventPage.classList.remove('visible');
    eventPage.classList.add('hidden');
    studentPage.classList.remove('hidden');
    studentPage.classList.add('visible');
    updateStudentForm();
};

backBtn.onclick = () => {
    if (currentStudent > 0) {
        currentStudent--;
        updateStudentForm();
    } else {
        studentPage.classList.remove('visible');
        studentPage.classList.add('hidden');
        eventPage.classList.remove('hidden');
        eventPage.classList.add('visible');
    }
};

studentForm.onsubmit = async (e) => {
    e.preventDefault();

    const submitButton = document.querySelector("#submitBtn"); // Select the submit button
    submitButton.disabled = true; // Disable button to prevent multiple clicks

    const formData = new FormData(studentForm);
    const studentData = Object.fromEntries(formData.entries());
    studentForms[currentStudent] = studentData;

    if (currentStudent < totalStudents - 1) {
        currentStudent++;
        updateStudentForm();
    } else {
        console.log("Submitting Student Data:", JSON.stringify(studentForms, null, 2));
        // alert(JSON.stringify(studentForms, null, 2));
        const members_data = studentForms;

        try {
            
            document.getElementById("loading-screen").style.display = "flex";
            const response = await initializePayment(event_id, event_amount, paymentUrl, verifyPaymentUrl, members_data);
            document.getElementById("loading-screen").style.display = "none";

            if (response && response.status === "success") {
                modal.querySelector('.modal-content').style.opacity = '0';
                setTimeout(() => {
                    modal.style.display = 'none';
                    resetForm();
                    alert('Form Submitted Successfully!');
                }, 300);
            } else {
                alert('Error submitting form. Please try again.');
            }
        } catch (error) {
            console.error("Payment failed:", error);
            alert('Error processing payment. Please try again.');
        } finally {
            document.getElementById("loading-screen").style.display = "none";
            submitButton.disabled = false; // Re-enable button after process completes
        }
    }
};



function updateStudentForm() {
    studentFormTitle.textContent = totalStudents === 1 ? 'Student Details' : `Student ${currentStudent + 1} Details`;
    submitBtn.textContent = currentStudent < totalStudents - 1 ? 'Next' : 'Submit';
    
    if (studentForms[currentStudent]) {
        for (const [key, value] of Object.entries(studentForms[currentStudent])) {
            document.getElementById(key).value = value;
        }
    } else {
        studentForm.reset();
    }
}

function resetForm() {
    currentStudent = 0;
    totalStudents = 1;
    studentForms = [];
    numMembersSelect.value = '1';
    totalPriceSpan.textContent = PRICE_PER_MEMBER;
    studentForm.reset();
    eventPage.classList.remove('hidden');
    eventPage.classList.add('visible');
    studentPage.classList.remove('visible');
    studentPage.classList.add('hidden');
    modal.style.display = 'none';
}


