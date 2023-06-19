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

## Get list of Movies

### Request

![Badge](https://img.shields.io/badge/Access-Public-brightgreen)
`GET /movies/`

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
