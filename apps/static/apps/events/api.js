async function create_payment(event_id, amount, csrf_token, paymentUrl) {
    try {
        const response = await fetch(paymentUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf_token,
            },
            body: JSON.stringify({ event_id, amount }),
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating payment:', error);
        return { status: 'error', message: 'Payment creation failed' };
    }
}

async function payment_verification(event_id, razorpay_order_id, razorpay_payment_id, razorpay_signature, csrf_token, verifyPaymentUrl) {
    try {
        const response = await fetch(verifyPaymentUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf_token,
            },
            body: JSON.stringify({
                event_id,
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            }),
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error verifying payment:', error);
        return { status: 'error', message: 'Payment verification failed' };
    }
}
