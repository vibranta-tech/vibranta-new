document.getElementById('pay-button').addEventListener('click', function () {
    // Retrieve CSRF token from meta tag
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    
    // Fetch order details (event id, amount) from the backend
    fetch(paymentUrl, {  // Use the dynamic URL passed from the template
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,  // Add CSRF token to the request headers
        },
        body: JSON.stringify({
            event_id: 1,  // Replace with actual event ID, ideally dynamically
            amount: 400,  // Amount in INR (in smallest unit: paise)
        }),
    })
    .then(response => response.json())  // Parse JSON response
    .then(data => {
        const orderId = data.order_id;

        // Initialize Razorpay payment gateway
        const options = {
            key: data.razorpay_api_key,  // Razorpay API Key from backend
            amount: 500 * 100,  // Amount in paise (500 INR)
            currency: 'INR',
            name: 'Vibranta Club',
            description: 'Tech Hackathon Event Payment',
            order_id: orderId,
            handler: function (response) {
                // Handle success: send data to your backend for verification
                const paymentData = {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    event_id: 1,  // Event ID to update the status
                };

                // Send the payment data to your backend for verification and to update status
                fetch(verifyPaymentUrl, {  // Use the dynamic URL passed from the template
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRFToken': csrfToken,  // Include CSRF token for this request
                    },
                    body:JSON.stringify(paymentData),
                })
                .then((verificationResponse) => verificationResponse.json())
                .then((verificationData) => {
                    if (verificationData.status === 'success') {
                        alert('Payment successful and event status updated!');
                    } else {
                        alert('Payment verification failed.');
                    }
                })
                .catch((error) => {
                    console.error('Error verifying payment:', error);
                    alert('Error verifying payment. Please try again.');
                });
            },
            prefill: {
                name: 'John Doe',  // Replace with user's name if available
                email: 'john.doe@example.com',
                contact: '9999999999',
            },
            theme: {
                color: '#000011',
            },
        };

        const razorpay = new Razorpay(options);
        razorpay.open();  // Open the Razorpay payment modal
    })
    .catch((error) => {
        console.error('Error during payment setup:', error);
        alert('Error during payment setup. Please try again.');
    });
});

