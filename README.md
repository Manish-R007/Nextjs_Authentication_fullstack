Project Overview 🚀
Project Name: User Authentication System with Email Verification 🔐
Description ✨

A full-stack web application that implements a secure and user-friendly authentication system. Users can sign up, log in, and verify their email addresses. Built with Next.js, React, MongoDB, and Tailwind CSS.

Key Features ✅

User Registration 📝

Create an account with username, email, and password.

Passwords are securely hashed 🔒 using bcryptjs.

Email Verification 📧

Sends unique verification link after signup.

Token expires after a set period ⏳.

User Login 🔑

Login only after verifying email.

Proper feedback for invalid credentials ❌.

Profile Page 👤

Displays user info after login.

Includes logout functionality 🚪.

Forgot Password 🔄

Feature is under development 🛠️.

Users will be able to reset passwords via email soon.

API Endpoints 🛠️

POST /api/users/signup – Register

POST /api/users/login – Login

POST /api/users/verifyemail – Verify Email

GET /api/users/extractuser – Get User Details

GET /api/users/logout – Logout

Frontend 💻

Next.js + React + Tailwind CSS

Responsive UI 🌐

Modern cards, buttons, and gradient backgrounds 🎨

Backend ⚙️

Node.js, Next.js API Routes

MongoDB with Mongoose

Nodemailer for email sending ✉️

Secure token handling and expiration ⏱️

Tech Stack 🛠️

Frontend: Next.js, React, Tailwind CSS 🎨

Backend: Node.js, Next.js API Routes ⚡

Database: MongoDB 🗄️

Email Service: Nodemailer ✉️

Authentication: Token-based 🔐

Password Security: bcryptjs 🔑

How to Run Locally 🏃‍♂️

Clone the repo:

git clone <your-repo-url>

    Install dependencies:

npm install

    Add .env file with credentials 🔑

    Run the server:

npm run dev

Future Enhancements 🌟

Forgot password functionality 🔄 (Ongoing)

User roles & access control 👥

Frontend validation and better error messages ⚠️

Dark/Light mode toggle 🌙☀️
