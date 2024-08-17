const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    let userExists = users.filter((user)=>{
        return user.username === username;
    });
    if(userExists.length > 0){
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    let validUsers = users.filter((user)=>{
        return (user.username === username && user.password === password);
    })
    if(validUsers.length > 0){
        return true;
    } else{
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    if(username && password){
        if(authenticatedUser(username, password)){
            let tkn = jwt.sign({data : password}, 'access', {expiresIn : 60 * 60});
            req.session.authorization = {tkn, username};
            return res.status(200).send(username + ' has successfully logged in')
        } else{
            return res.status(208).json({message: "Username or Password is wrong"});
        }
    } else{
        return res.status(404).json({message: "Username or Password is missing"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
    if(req.params.isbn > Object.keys(books).length){
        return res.status(404).json({message : 'ISBN does not exist'});
    }
    const isbn = req.params.isbn;
    const review = req.query.review;
    books[isbn].review = review;
    username = req.session.authorization.username;
    return res.status(200).type('json').send(JSON.stringify(books[isbn], null, 4) + "" + username);
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
    if(req.params.isbn > Object.keys(books).length){
        return res.status(404).json({message : 'ISBN does not exist'});
    }
    const isbn = req.params.isbn;
    books[isbn].review = "";
    username = req.session.authorization.username;
    return res.status(200).type('json').send(JSON.stringify(books[isbn], null, 4) + "review deleted by: " + username);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
