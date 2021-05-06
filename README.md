
# Ticketing application

This is my submission for Archimydes frontend evaluation challenge.

## Summary

An application where users can add user stories and an admin can review the stories by accepting/rejecting them.


## Tech Stack

**Client:** React, Ant Design

**Server:** Node, Express (Provided by Archimydes)

  
## Assumptions and addition

I have used Context API instead of Redux to store the authenticated user details. For keeping the details even after a page refresh, I have used localStorage to store the details.

I have added a *logout* functionality to the application so that user/admin can logout. This clears the information stored in Context API and also the local storage. If not logged out, the local storage has the details stored and will always remember the past login.

## Possible changes

If time permitted, I would have tested for all accessibility practices and solved the issues. Also, I would have added unit tests to the frontend code.

## Run Locally

Clone the project

```bash
  git clone https://github.com/SaishSankhe/ticket-app-react.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies in server and client

```bash
  cd server
```

```bash
  npm install
```

```bash
  cd client
```

```bash
  npm install
```

Start the server

```bash
  npm start
```

Start the client

```bash
  npm start
```

  
