Microservices Authentication Practice

This repository demonstrates the use of microservices for handling user authentication using Node.js, Express, Passport.js, JWT, and React. The setup includes two core services for demonstrating authentication and session handling using Google OAuth.

Overview

This practice repository uses Passport.js with Google OAuth to authenticate users within a microservices architecture. A JWT token is generated upon successful login, stored in an httpOnly cookie, and used by the Greeting Service to validate requests and return user information.
Features

    Microservices architecture with separate services for account handling and greeting
    Google OAuth authentication with Passport.js
    JWT-based session handling
    React client for testing the authentication flow
    Secure, httpOnly cookies for session tokens


Microservice Structure

This practice setup includes the following services:

    Account Service: Handles Google OAuth authentication and issues JWT tokens.
    Greeting Service: Validates JWT tokens to greet authenticated users.

Endpoints
Account Service

    GET /auth/google: Redirects to Google for authentication.
    GET /auth/google/callback: Callback endpoint for Google to redirect users back to after login. Issues a JWT token stored in an httpOnly cookie.

Greeting Service

    GET /greetme: Returns a greeting message for authenticated users by validating the JWT token.

How It Works

    Google Authentication: Users are redirected to Google for authentication. Once authenticated, they are redirected back to the Account Service, where a JWT token is created.
    JWT Token in httpOnly Cookie: The JWT token is stored in an httpOnly cookie for security.
    Greeting Service Validation: The Greeting Service validates the JWT token, allowing access to user-specific endpoints based on token authenticity.