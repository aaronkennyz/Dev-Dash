# Deploying Your Event Website

This guide will walk you through deploying your new autumn-themed event website to Vercel and connecting it with the GigByCity server.

## 1. Deploying to Vercel

Vercel is a platform that makes it incredibly easy to deploy websites.

**Steps:**

1.  **Sign up for Vercel:** If you don't have an account, go to [vercel.com](https://vercel.com) and sign up for a free account.
2.  **Install the Vercel CLI:** Open your terminal (or command prompt) and run the following command:
    ```bash
    npm install -g vercel
    ```
3.  **Deploy your site:**
    *   Navigate to your project directory in the terminal:
        ```bash
        cd path/to/your/project
        ```
    *   Run the `vercel` command:
        ```bash
        vercel
        ```
4.  **Follow the prompts:** Vercel will ask you a few questions about your project. The default answers should work fine for this simple HTML/CSS/JS site.
5.  **Done!** Vercel will give you a URL for your live site (e.g., `https://your-project-name.vercel.app`).

## 2. Updating the GigByCity Server

After you deploy your site to Vercel, you need to tell the GigByCity server where to find it. This is important for features like Google Authentication to work correctly.

**Steps:**

1.  **Get your Vercel URL:** This is the URL you got after deploying to Vercel.
2.  **Contact the GigByCity admin:** You'll need to send your Vercel URL to the administrator of your GigByCity instance. They will update the server's configuration to allow your website to make API requests and handle authentication.

## 3. Google Authentication

This website is set up to use Google for user sign-in.

**How it works (in simple terms):**

1.  When a user clicks the "Sign In" button (which we've simplified to a prompt for this hackathon), they are sent to a Google login page.
2.  After they sign in with their Google account, Google sends a special, secure token back to the website.
3.  Our website then sends this token to the GigByCity server.
4.  The server verifies the token with Google and creates a new user account (or logs in an existing user).
5.  The server then sends back its own token (`fida_token`) to our website, which is used to make other API calls (like registering for an event).

**What you need to do:**

The GigByCity server administrator needs to configure Google Cloud Platform to allow your website to use Google login. This involves setting up OAuth 2.0 credentials and adding your Vercel URL to the list of authorized JavaScript origins. You do not need to do anything for this part other than providing your Vercel URL to the admin.
