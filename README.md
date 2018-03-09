# shopping-backend

Nodejs backend for a simple assessment shopping system
============================

### welcome to the repository

feel free to access [my portfolio] (http://malcy.cf).

> ## Prerequisites:
* nodejs
* npm
+ internet connection
>

> ### **Steps to deploy:using terminal for mac/linux and git bash for windows**
1. `git clone https://github.com/NazoSnare/shopping-backend.git`
2. `cd ./shopping-backend`
3. `npm install && npm start`
4. backend application will be running on http://localhost:3000
5. The frontend runs on a separate port and to allow flexibility through rest-api e.g mobile,watches and car apps are now possible

# Routes :
* POST /api/v1/users/register ---> register a user
* POST /api/v1/users/authenticate -->sign in and get token
* GET /api/v1/users/profile ---> get profile if signed in
* GET /api/v1/users/transactions ---> view all transactions by user's id in body
* POST /api/v1/users/topup ----> top up user balance with amount in body
* GET /api/v1/products ---> view products
* POST /api/v1/products/:id --> purchase a products by id
* GET /api/v1/products/:id ---> view a product by id
* GET /admin/products/ ---> view all products if authenticated as user admin
* PUT /admin/products/:id -----> edit product by id if authenticated as admin
* DELETE /admin/product/:id ----->delete product by id if I decided to add it
