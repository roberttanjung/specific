# Login Page UI/UX Design Rules

## Layout

- Use a centered card layout with enough white space around the form.
- Keep the form width readable on desktop and responsive on mobile.
- Place the heading, subheading, and action area in a clear vertical order.

## Inputs

- Label each field clearly: Email and Password.
- Use a password input type for the password field.
- Display inline validation messages directly below the field.
- Keep form fields full width inside the card.

## Validation feedback

- Validate email format on submit and show a specific message.
- Validate password requirements on submit and show one message if the password is invalid.
- Highlight invalid fields with a visible error state.
- Use a toast or alert banner for authentication errors returned by the server.

## Actions

- Use a primary button labeled `Sign In`.
- Disable the button while the request is in progress.
- Provide a secondary action for `Forgot password?` if the design expands later.

## Token handling

- Login must keep the token in cookies.
- After successful login, redirect to the authenticated page.
- If a token is missing or invalid, redirect back to the login page.
- On logout, clear the cookie and send the user to login.

## Accessibility

- Ensure form fields have associated labels.
- Keep button text concise and descriptive.
- Preserve keyboard focus order.
- Show error messages in a way that screen readers can announce them.

## Visual style

- Use the app theme with muted background and strong accent for action buttons.
- Keep the page uncluttered and avoid visual noise near the form.
- Show a friendly success or error message after action.
