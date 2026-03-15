document.addEventListener('DOMContentLoaded', () => {
    const eventDetailsContainer = document.getElementById('event-details');
    const registerButton = document.getElementById('register-btn');
    const eventId = '69b69679c34207e691c1f576';

    async function displayEvent() {
        try {
            const event = await FidaAPI.events.getOne(eventId);
            let eventHtml = `
                <h2>${event.name}</h2>
                <p>${event.description}</p>
                <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> ${event.location}</p>
            `;
            if (event.cost > 0) {
                eventHtml += `<p><strong>Cost:</strong> $${event.cost}</p>`;
            } else {
                eventHtml += `<p><strong>Cost:</strong> Free</p>`;
            }
            eventDetailsContainer.innerHTML = eventHtml;
        } catch (error) {
            console.error('Error fetching event:', error);
            eventDetailsContainer.innerHTML = '<p>Could not load event details. Please try again later.</p>';
        }
    }

    displayEvent();


    async function registerForEvent() {
        const token = localStorage.getItem('fida_token');
        if (!token) {
            alert('Please sign in to register for the event.');
            // In a real application, you would redirect to a login page.
            // For now, we'll simulate a login by setting a dummy token.
            const googleToken = prompt('Enter your Google token to "sign in":');
            if (googleToken) {
                try {
                    const authResponse = await FidaAPI.auth.googleLogin(googleToken);
                    if (authResponse.token) {
                        localStorage.setItem('fida_token', authResponse.token);
                        alert('You are now signed in. Please click register again.');
                    } else {
                        alert('Sign-in failed. Please try again.');
                    }
                } catch (error) {
                    alert('Sign-in failed. Please try again.');
                    console.error('Sign-in error:', error);
                }
            }
            return;
        }

        try {
            const event = await FidaAPI.events.getOne(eventId);
            if (event.cost > 0) {
                // Paid event
                const order = await FidaAPI.events.createOrder(eventId);
                if (order && order.id) {
                    alert('Order created! Please complete the payment.');
                    // In a real app, you would redirect to a payment gateway.
                    // For this hackathon, we'll simulate a successful payment.
                    const paymentData = {
                        razorpay_order_id: order.id,
                        razorpay_payment_id: 'simulated_payment_id',
                        razorpay_signature: 'simulated_signature'
                    };
                    const verification = await FidaAPI.events.verifyPayment(paymentData);
                    if (verification.success) {
                        alert('Payment successful! You are now registered for the event.');
                    } else {
                        alert('Payment verification failed. Please try again.');
                    }
                } else {
                    alert('Could not create order. Please try again.');
                }
            } else {
                // Free event
                const joinResponse = await FidaAPI.events.join(eventId);
                if (joinResponse.success) {
                    alert('You are now registered for this free event!');
                } else {
                    alert('Registration failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Registration Error:', error);
            alert('An error occurred during registration. Please try again later.');
        }
    }

    registerButton.addEventListener('click', registerForEvent);
});
