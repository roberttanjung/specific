# Prompt: Sign In PR

## Objective

Create Login page.

## Variables

- `sign-in`: {process.env.NEXT_PUBLIC_BASE_API_SPECTRUM}/basic-auth/sign

## `sign-in` Endpoint

- Method: POST
- Body: {
  email: string,
  password:  string
}
- Response: {
  email: string,
  id_token: string,
  name: string
}

## The Rules

- Login with email and password
- Token is kept in Cookies
- Use Token as ticket to access authenticated page
- Token is built with JWT standard, so it can be decoded to get the user information
- If token is invalid or expired, user should be redirected to login page

## Validations

### Email

- Must be a valid email format

### Password

- Minimum 8 characters
- Must contain at least one uppercase letter
- Must contain at least one lowercase letter
- Must contain at least one number

## Tasks as flow

[ ] Create Login page with proper UI/UX design and generate the design rules into interface.agent.md
[ ] Create API to login with email and password also the button to trigger the API
[ ] Hit `sign-in` endpoint
[ ] If success, store the token in Cookies and redirect to authenticated page. If failed, show error message to user with Toast
[ ] After login was successful, decode the token to get user information and display it on authenticated page
[ ] Implement token validation logic to check if the token is valid and not expired. If invalid, redirect to login page
[ ] Check in Database if the user exists, if not, save the user information to Database. This is for future use to manage user information and permissions
[ ] Make sure authenticated page can only be accessed with valid token in Cookies
[ ] Implement logout functionality to clear token from Cookies and redirect to login page
