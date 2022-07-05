# NodeJS CRUD Server with MongoDB

## Instructions
- rename `.env.sample` to `.env`
- run `npm install` to install dependencies
- run `npm run start:dev` to start development server

## Folder Structure
```
.
├── LICENSE
├── package.json
├── README.md
├── requests.http
└── src
    ├── controllers
    │   ├── index.js
    │   └── users.controller.js
    ├── index.js
    ├── middlewares
    │   ├── error.middleware.js
    │   └── index.js
    ├── models
    │   ├── index.js
    │   ├── names.js
    │   └── users.model.js
    ├── routes
    │   ├── index.js
    │   └── users.route.js
    ├── services
    │   ├── index.js
    │   └── users.service.js
    └── utils
        ├── index.js
        └── user.js
```

## Routes
> see [requests.http](requests.http) for more details

| Method | Route      | Description                                 |
| ------ | ---------- | ------------------------------------------- |
| GET    | /users     | fetch all users                             |
| GET    | /users/:id | fetch user with `id`                        |
| POST   | /users     | create new user                             |
| PATCH  | /users/:id | update user information for provided fields |
| DELETE | /users/:id | delete user with `id`                       |

[MIT LICENSE](LICENSE)