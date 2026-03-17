document.addEventListener('DOMContentLoaded', () => {
    const eventDetailsContainer = document.getElementById('event-details');
    const googleSignInContainer = document.getElementById('google-signin-container');
    const registerBtn = document.getElementById('register-btn');
    const eventId = '69b69679c34207e691c1f576';
    let CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

    // --- Event & Auth Logic ---
    async function displayEvent() {
        try {
            // Target the container inside the section to inject details
            const container = eventDetailsContainer.querySelector('.container');
            container.innerHTML = '<h2>Loading event details...</h2>'; // Show loading message

            const event = await FidaAPI.events.getOne(eventId);
            const image='assets/'+'Dev&DashRoom.jpg'
            // Build the HTML for the event details, matching the new design
            let eventHtml = `
                <h2 class="section-title animate-on-scroll">EVENT DETAILS</h2>
                <div class="grid-half">
                    <div class="section-content-image animate-on-scroll animate-left image-l">
                        <img src="${image}">
                    </div>
                    <div class="section-content-text animate-on-scroll animate-right">
                        <h3>${event.name}</h3>
                        <p>${event.description}</p>
                        <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
                        <p><strong>Location:</strong> ${event.location}</p>
                        <p><strong>Cost:</strong> ${event.cost > 0 ? `$${event.cost}` : 'Free'}</p>
                    </div>
                </div>
            `;
            container.innerHTML = eventHtml;

            // Re-run the animation observer for the newly added content
            observeAnimations();

        } catch (error) {
            console.error('Error fetching event:', error);
            eventDetailsContainer.querySelector('.container').innerHTML = '<h2 class="section-title">Could not load event details. Please try again later.</h2>';
        }
    }

    async function handleCredentialResponse(response) {
        try {
            const authResponse = await FidaAPI.auth.googleLogin(response.credential);
            if (authResponse.token) {
                localStorage.setItem('fida_token', authResponse.token);
                updateLoginUI();
            } else {
                alert('Sign-in failed. Please try again.');
            }
        } catch (error) {
            alert('Sign-in failed. Please try again.');
            console.error('Sign-in error:', error);
        }
    }

    function updateLoginUI() {
        const token = localStorage.getItem('fida_token');
        if (googleSignInContainer) {
            googleSignInContainer.innerHTML = ''; // Clear the container
        } else {
            console.error("google-signin-container not found!");
            return;
        }


        if (token) {
            // User is logged in
            FidaAPI.auth.getMe().then(user => {
                const welcomeEl = document.createElement('div');
                welcomeEl.classList.add('user-welcome');
                welcomeEl.innerHTML = `
                    <span>Welcome, ${user.name}!</span>
                    <button id="logout-btn">Logout</button>
                `;
                googleSignInContainer.appendChild(welcomeEl);
                document.getElementById('logout-btn').addEventListener('click', logout);
            }).catch(() => {
                // If getMe fails, the token is likely invalid
                logout();
            });
        } else {
            // User is not logged in
            try {
                google.accounts.id.initialize({
                    client_id: CLIENT_ID,
                    callback: handleCredentialResponse
                });
                google.accounts.id.renderButton(
                    googleSignInContainer,
                    { theme: "outline", size: "large" }
                );
            } catch (error) {
                console.error("Google Sign-In initialization failed:", error);
                googleSignInContainer.innerHTML = "<p>Could not load Sign-In.</p>";
            }
        }
    }

    function logout() {
        localStorage.removeItem('fida_token');
        updateLoginUI();
    }

    async function registerForEvent() {
        const token = localStorage.getItem('fida_token');
        if (!token) {
            alert('Please sign in to register for the event.');
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

    // --- Animation Logic from Prototype ---
    function observeAnimations() {
        const observerOptions = {
            root: null,
            threshold: 0.15,
            rootMargin: '0px 0px -5% 0px'
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });

        // Eagerly animate elements already in view on load
        elementsToAnimate.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                element.classList.add('visible');
                observer.unobserve(element);
            }
        });
    }


    // --- Scroll-based Background Animation ---
    let lastScrollTop = 0;
    const body = document.body;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // Simple parallax effect
        body.style.backgroundPositionY = `${scrollTop * 0.5}px`;
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
    }, { passive: true });


    // --- Initializations ---
    FidaAPI.auth.ax001().then(() => {
        if(window.googleClientId) {
            CLIENT_ID = window.googleClientId;
        }
        displayEvent();
        updateLoginUI();
        observeAnimations(); // Initial call for animations
    }).catch(error => {
        console.error('Failed to load config:', error);
        displayEvent();
        updateLoginUI();
        observeAnimations();
    });

    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault(); // It's an <a> tag, prevent it from navigating
            registerForEvent();
        });
    }
});

