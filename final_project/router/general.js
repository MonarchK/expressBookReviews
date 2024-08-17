const express = require('express');
let axios = require('axios').default;
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    if(username && password){
        if(!isValid(username)){
            users.push({'username' : username, 'password' : password});
            return res.status(200).send(username + "'s account has been successfully created")
        } else{
            return res.status(404).json({message : 'user already exists'})
        }
    }
    return res.status(404).json({message : 'Username or Password is missing'})
});

//using axios
/*async function retrieveMain(url){
    try{
        inventory = await axios.get(url);
        console.log(inventory.data);
    } catch(err){
        console.log(err)
    }
}
retrieveMain('http://localhost:5000/');*/

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).type('json').send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    if(req.params.isbn > Object.keys(books).length){
        return res.status(404).json({message : 'ISBN does not exist'});
    }
  const isbn = req.params.isbn;
  return res.status(200).type('json').send(JSON.stringify(books[isbn], null, 4));
 });

 //using axios
 /*function getBookByISBN(isbn) {
    return new Promise((resolve, reject) => {
        if (isbn > Object.keys(books).length) {
            reject({ status: 404, message: 'ISBN does not exist' });
        } else {
            resolve({ status: 200, data: books[isbn] });
        }
    });
}
const isbn = "2"; // Example ISBN
getBookByISBN(isbn)
    .then(response => {
        console.log(`Status: ${response.status}`);
        console.log(`Data: ${JSON.stringify(response.data, null, 4)}`);
    })
    .catch(error => {
        console.error(`Status: ${error.status}`);
        console.error(`Message: ${error.message}`);
    });*/

  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let i = 1;
  while(i <= Object.keys(books).length){
    if(books[i].author === req.params.author){
        return res.status(200).type('json').send(JSON.stringify(books[i], null, 4));
    }
    i += 1;
  }
  return res.status(404).json({message: "Book not available"});
});

//using axios
/*function getBookByAuthor(author) {
    return new Promise((resolve, reject) => {
        let i = 1;
        while (i <= Object.keys(books).length) {
            if (books[i].author === author) {
                resolve({ status: 200, data: books[i] });
                return;
            }
            i += 1;
        }
        reject({ status: 404, message: "Book not available" });
    });
}
const author = "Chinua Achebe"; // Example author
getBookByAuthor(author)
    .then(response => {
        console.log(`Status: ${response.status}`);
        console.log(`Data: ${JSON.stringify(response.data, null, 4)}`);
    })
    .catch(error => {
        console.error(`Status: ${error.status}`);
        console.error(`Message: ${error.message}`);
    });*/

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let i = 1;
  while(i <= Object.keys(books).length){
    if(books[i].title === req.params.title){
        return res.status(200).type('json').send(JSON.stringify(books[i], null, 4));
    }
    i += 1;
  }
  return res.status(404).json({message: "Book not available"});
});

//using axios
/*function getBookByTitle(title) {
    return new Promise((resolve, reject) => {
        let i = 1;
        while (i <= Object.keys(books).length) {
            if (books[i].title === title) {
                resolve({ status: 200, data: books[i] });
                return;
            }
            i += 1;
        }
        reject({ status: 404, message: "Book not available" });
    });
}
const title = "One Thousand and One Nights"; // Example author
getBookByTitle(title)
    .then(response => {
        console.log(`Status: ${response.status}`);
        console.log(`Data: ${JSON.stringify(response.data, null, 4)}`);
    })
    .catch(error => {
        console.error(`Status: ${error.status}`);
        console.error(`Message: ${error.message}`);
    });*/


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  if(req.params.isbn > Object.keys(books).length){
    return res.status(404).json({message : 'ISBN does not exist'});
  }
  const isbn = req.params.isbn;
  return res.status(200).type('json').send(JSON.stringify(books[isbn], null, 4));
});

module.exports.general = public_users;
