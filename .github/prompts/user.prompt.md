# Prompt: User PR

## Objective

Create User Management page.

## List User Page (Authenticated)

A List User page that shows list of users with Table view.

The Table View will show this bellow:

- Name
- Email
- Division
- Department
- Superintendent
- Direct Report
- Actions

**The Rules**:

- Click on the empty space in row can inflict redirect to detail user
- Hover on Email can inflict Icon Button for copy the email

### Actions

List of Actions that displays with Icon Button:

- Edit User: Redirect to Detail User
- Delete User: Delete the user

### Delete User

Change the status of user turn into 0.

**The flow**:

- User click Delete User
- Popup reminder shows up with 2 button options: No & Yes
- User click No then the Popup reminder will be hid
- User click Yes then the process will be inflicted

## Create / Detail / Update User page (Authenticated)

A reuseable Pages for Create, Detail, and Update User.

**The Rules**:

- Direct Report can be selected as multiple

**The Fields***:

- Name:
  - type: Text
  - validations:
    - Required
    - min: 4
    - max: 60
- Email:
  - type: Email
  - validations:
    - Required
    - min: 4
    - max: 60
- Division:
  - type: Select
  - Enum:
    - IT Development
  - validations:
    - Required
- Department:
  - type: Select
  - Enum:
    - Multiplatform
  - validations:
    - Required
- Superintendent:
  - type: Autocomplete with endpoint
  - Endpoint is used for get list Superintendent in the Division
  - validations:
    - Required
    - min: 4
    - max: 60
- Direct Report:
  - type: Multiple Autocomplete with endpoint
  - Endpoint is used for get list Member bellow the creator

## Tasks

[ ] Create Table View as reuseable component
[ ] Create List User page
[ ] Create Create / Detail / Update User page
