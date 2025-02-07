// Attach the initializePayment function to the window object to make it globally available
window.initializePayment = async function(event_id, amount, paymentUrl, verifyPaymentUrl, members_data = null) {
    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        const response = await fetch(paymentUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({ event_id, amount }),
        });

        if (!response.ok) {
            console.log('Error during payment setup. {get payment-order_id failed } ->initializePayment');
            throw new Error('Failed to initiate payment. PLEASE TRY AGAIN!');
        }

        const data = await response.json();
        const payment_id = data.payment_id;

        return new Promise((resolve, reject) => {
            const options = {
                key: data.razorpay_api_key,
                amount: amount * 100, // Convert to paise
                currency: 'INR',
                name: 'Vibranta Club',
                description: 'Tech Hackathon Event Payment',
                order_id: data.order_id,
                handler: async function(response) {
                    const verificationResponse = await verifyPayment(response, payment_id, event_id, verifyPaymentUrl, csrfToken, members_data);
                    resolve(verificationResponse); // Return the verification response
                },
                prefill: {
                    name: '',
                    email: '',
                    contact: '',
                },
                theme: { color: '#000011' },
                modal: {
                    escape: true, // Allow user to close modal with ESC key
                    ondismiss: function() {
                        console.warn("User closed the payment popup.");
                        // alert("Payment process was canceled. Please try again.");
                        resolve({ status: "canceled" }); // Resolve the promise so loading screen hides
                    }
                }
            };

            const razorpayInstance = new Razorpay(options);
            razorpayInstance.on('payment.failed', function(response) {
                console.error("Payment failed:", response.error);
                alert('Payment failed. Please try again.');
                reject(response.error);
            });

            razorpayInstance.open();
        });

    } catch (error) {
        console.error('Error during payment setup:', error);
        // alert('Error during payment setup. Please try again.');
        return Promise.reject(error);
    }
};


// Attach the verifyPayment function to the window object to make it globally available
window.verifyPayment = async function(response, payment_id, event_id, verifyPaymentUrl, csrfToken, members_data) {
    try {
        const paymentData = {
            payment_id: payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            event_id,
            members_data,
        };

        const req = await fetch(verifyPaymentUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify(paymentData),
        });

        if (!req.ok) {
            throw new Error('Payment verification failed.');
        }

        return await req.json(); // Fix: Ensure JSON is returned
    } catch (error) {
        console.error('Error verifying payment:', error);
        alert('Payment verification failed. Please contact support.');
        return null;
    }
};
