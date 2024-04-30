# Taskendar - Frontend

This repository contains a SPA developed to handle Tasks based on date

## Stack

-   Vite
-   React
-   Redxu/toolkit
-   Typescript
-   Tailwindcss
-   Vitest

## Requirements

### Backend

The backend was also developed and you can find it on my github profile. IT MUST BE STARTED BEFORE RUNNING THIS APPLICATION.

### Auth0

To run this application you'll need a up and running Auth0 application. Create a **.env** file with the following structure

```js
VITE_AUTH0_DOMAIN = yourAuth0DomainHere;
VITE_AUTH0_CLIENT_ID = yourAuth0ClientIdHere;
VITE_AUTH0_AUDIENCE = yourApiAudience; //api audience
VITE_API_URL = theApiUrlRunning;
```

You'll need to create an api in the Auth0 dashboard to be able to get the AUTH0 audience. Otherwise, all the token generated will be opaque and the api will not be able to authenticate the user

In my case i've defined my audience as **http://localhost:3333** to match the api url. But if you change the port, your audience will be differente.

To able to retrieve both **VITE_AUTH0_CLIENT_ID** and **VITE_AUTH0_DOMAIN** you'll need to create an application.

So **VITE_AUTH0_AUDIENCE** will be the one set up in the API, and the **VITE_AUTH0_CLIENT_ID** and **VITE_AUTH0_DOMAIN** will be from the Application. You can find the menus on the Auth0 dashboard:

-   dashboard > Applications > Applications
-   dashboard > Applications > APIs

**_ALL THE AUTH INFORMATION MUST MATCH THE ONES PROVIDED IN THE BACKEND APPLICATION_**

### How to run

#### Important

Run the backend api **_before_** running the frontend applicaton

#### Steps

Clone this repository, change to the directory, and run

```bash
npm install
```

Than, run the following command

```
npm run dev
```

And open the browser in the link showed on the terminal
