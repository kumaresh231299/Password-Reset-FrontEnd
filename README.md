# Frontend - Password Reset Application

This is the frontend application for the Password Reset system, bulit with React and Vite.

It includs features for user signup, signin, forgot password and reset password functionalities.

## Features 

- **SignUp** : Allows user to register with an name,email and password.
- **SignIn** : Allows user to log in using email and password.
- **Forgot Password** : Allows users to request a password reset link.
- **Reset Password** : Allows users to reset their password using a reset link.

#### NOTE : The password link in the email will not work if the password is successfully changed.

## Usage
### Sign up

Navigation to the signup page and fill in the registration form with your name, email and password. 

### Sign in

Navigate to the signin poage and enter your email and password to log in. 

### Forgot Password

On the forgot password page, enter your email to receieve a password reset link.

### Reset Password

Use the password reset link sent to your email to navigate to the reset password page. Enter a new password to complete the reset process.

## Form Validation

Form validation is managed using Formik and Yup:

- ***Signup Form*** : *Validates name string, email format and password strength.*
- ***Signin Form*** : *Validates email format and password correctness.*
- ***Forgot Password Form*** : *Validates email format.*
- ***Reset Password Form*** : *Validates new password strength and confirmation.*

## Design 
The application is styled using **"react-bootstrap"** for responsive design and **"react-icons"** for icons.
The UI components are designed to be simple and user-friendly.

## Dependencies

1. React : A JavaScript library for buliding user interfaces.
2. Vite : A bulit tool that provides a fast development environment.
3. Formik : Formiks library for handling form state and validation.
4. Yup : Schema bulider for runtime value parsing and validation.
5. React-Bootstrap : Bootstrap components for React.
6. React-Icons : Icons for React components.

## Deployment

https://password-reset-sk.netlify.app/