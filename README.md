# Movies Site Backend

This is the backend component of the Movies Site, a web application for creating, udating and browsing movies.
Site use the jwt-tokens authentication for protected endpoints.

## Installation

Don't forget to create `.production.env` or `.development.env` files like the `.example.env` for enviroment variables.

Use the **yarn** package manager to install and run this project.

### Install:

```bash
yarn
```

### Running in the development mode:

```bash
yarn start:dev
```

### Running in the production mode:

```bash
yarn start
```

# REST API

You can use Postman or other tools to test next URL endpoints.

## Authentication: Sign Up

### Request

`POST /auth/registration`

**Request body:**

    {
        "email": "test@mail.com",
        "password": "qwerty12345"
    }

### Response

    {
        "accessToken": "some_access_token",
        "user": {
            "email": "testxsxa2@gmail.comds",
            "_id": "6490ba8c86db843c978c41ee"
        }
    }

### Response cookies

**refreshToken** - token for refreshing access token

## Authentication: Sign In

### Request

`POST /auth/login`

**Request body:**

    {
        "email": "test@mail.com",
        "password": "qwerty12345"
    }

### Response

    {
        "accessToken": "some_access_token",
        "user": {
            "email": "testxsxa2@gmail.comds",
            "_id": "6490ba8c86db843c978c41ee"
        }
    }

### Response cookies

**refreshToken** - token for refreshing access token

## **Authentication**: Refresh Access Token

### Request

`POST /auth/refresh`

**Request body:**

    {
        "refreshToken": "refresh_token_from_auth_cookies"
    }

### Response

    {
        "accessToken": "some_access_token",
        "user": {
            "email": "testxsxa2@gmail.comds",
            "_id": "6490ba8c86db843c978c41ee"
        }
    }

### Response cookies

**refreshToken** - token for refreshing access token

## Get the list of Movies

![Badge](https://img.shields.io/badge/Access-Public-brightgreen)

### Request

`GET /movies/`

### Query parameters:

**order** - for sorting movies:

- 0 - descending sort
- 1 - ascending sort

### Response

    [
        {
            "_id": "6490aa9793e5f0627e8445e3",
            "title": "It",
            "description": "very scary film",
            "image": "dfb5c862-f784-4117-87e2-722e9dba0674.jpg",
            "rating": 5,
            "__v": 0
        }
    ]

## Get the single movie object

![Badge](https://img.shields.io/badge/Access-Public-brightgreen)

### Request

`GET /movies/:id`

### Response

    {
        "_id": "6490aa9793e5f0627e8445e3",
        "title": "It",
        "description": "very scary film",
        "image": "dfb5c862-f784-4117-87e2-722e9dba0674.jpg",
        "rating": 5,
        "__v": 0
    }
