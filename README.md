# shopping-backend

Nodejs backend for Miyas shop
============================

### welcome to the repository

> ## Prerequisites:
* nodejs
* npm
+ internet connection for **mlab** database mongodb `for consistency`
>

> ### **Steps to deploy:using terminal for mac/linux and git bash for windows**
1. `git clone https://github.com/NazoSnare/shopping-backend.git`
2. `cd ./shopping-backend`
3. `npm install && npm start`
4. backend application will be running on http://localhost:3000
5. The frontend runs on a separate port and to allow flexibility through rest-api e.g mobile,watches and car apps are now possible

# Routes :
* UI http://localhost:3000/admin
* POST /api/v1/users/register ---> register a user
* POST /api/v1/users/authenticate -->sign in and get token
* GET /api/v1/users/profile ---> get profile if signed in
* POST /api/v1/users/topup ----> top up user balance with amount in body
>
* GET /api/v1/products ---> view all products
* POST /api/v1/products/add --> add a new product
* POST /api/v1/products/purchase --> a protected route to purchase product on behalf of user
* GET /api/v1/products/:id ---> view a product by id
>

* GET /api/v1/transactions ---> view sorted transactions by user's id in token's user id (`transaction.user._id ==token.user._id`)
* GET /api/v1/transactions/all ---> view sorted transactions by all users (`only admin user can access`)
* POST /api/v1/transactions/add ---> add transaction to transactions passing a user and product or user and amount
> ## **served through backend UI**  
* GET /admin/---> view all products if authenticated as user admin
* POST /admin/products ---> add a new products if authenticated as user admin
