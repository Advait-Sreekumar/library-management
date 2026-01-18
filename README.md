# library-management

    This is a library management API backend fro the mangement of user and books

## Routes and the end points

## /users
GET:Get all the list of users in the system
POST: Create a new user

## /users{id}
GET: Get a user by their id
PUT: Updating a user by ther id
DELETE: Deleting a user by their id(Check if the user still has an issued book)&&(is there any fine/penatlty to be collected)

## /users/subscription-details/{id}
GET: Get a user subscription details by theri id
    >>Date of subscription
    >>Valid time?
    >>Fine if any?

## /books
GET:Get all the books in the library
POST: Add a new book to the system

## /books{id}
GET:Get a book by its id
PUT:Update a book by its id
DELETE:Delete a book by its id

## /books/issued
GET:Get all the issued books

## /books/issued/withFine
GET:Get all issued books with their fine amount

## Subscription types
    >>Basic(3 months)
    >>Standard(6 months)
    >>Premium(12 months)

> > If a user missed the renewal date, then user should be collected with $100
> >If a user misses his subscription, then user is expected to pay$100
> > If a user misses both renewal and subscription, then the collected amount should be $200

## Commands:
npm init
npm i express
npm i nodemon --save-dev

npm run dev