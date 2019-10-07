const http = new EasyHTTP;
// get users
// http.get('https://jsonplaceholder.typicode.com/users')
// .then(data => console.log(data))
// .catch(err => console.log(err));

// User Data 
  const data = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'jdoe@gmail.com',
  }

// create user
http.post('https://jsonplaceholder.typicode.com/users', data)
.then(data => console.log(data))
.catch(err => console.log(err));

// update user
// http.put('https://jsonplaceholder.typicode.com/users/2', data)
// .then(data => console.log(data))
// .catch(err => console.log(err));

// delete user
// http.delete('https://jsonplaceholder.typicode.com/users/2', data)
// .then(data => console.log(data))
// .catch(err => console.log(err));

// one line functions don't need braces, has an implicit return of string 'Hello world'
// const sayHello = () => 'Hello world';

// same as above: ^^  ^^  ^^
// const sayHello = function {
//   return 'Hello world';
// }

// single param doesn't need parens ()
// const sayHello = name => console.log(`Hello ${name}`);

//  multi params need parens
// const sayHello = (name, age) => console.log(`Hello ${name} who is ${age}`);

// To return an object
// const sayHello = () = ({ msg: 'Hello world'});

// const users = ['Alice', 'Bob', 'Charlie'];

// const nameLengths = users.map(function(name){
//   return name.length;
// });
// console.log(nameLengths);
// // same
// const nameLengths = users.map((name) => {
//   return name.length;
// });
// shortest
// const nameLengths = users.map(name => name.length);

// *******************************************
// previous http library iteration below:

// const http = new easyHTTP;

  // // // get posts
  // // http.get('https://jsonplaceholder.typicode.com/posts',
  // // function(err, posts) {
  // //   if(err) {
  // //     console.log(err);
  // //   } else {
  // //     consols.log(posts);
  // //   }
  // // });

  // // // get SINGLE posts (using url directed towards individual posts...s)
  // // http.get('https://jsonplaceholder.typicode.com/posts/1',
  // // function(err, post) {
  // //   if(err) {
  // //     console.log(err);
  // //   } else {
  // //     consols.log(post);
  // //   }
  // // });

  // // Create Data
  // const data = {
  //   title: 'Custom Post',
  //   body: 'This is a custom post'
  // };
  // // create Post
  // // http.post('https://jsonplaceholder.typicode.com/posts', data, function(err, post) {
  // //   if(err) {
  // //     console.log(err)
  // //   } else {
  // //     console.log(post);
  // //   }
  // // });

  // // Update a post
  // // http.put('https://jsonplaceholder.typicode.com/posts/1', data, function(err, post) {
  // //   if(err) {
  // //         console.log(err)
  // //       } else {
  // //         console.log(post);
  // //       }
  // // });

  // // Delete post
  // http.delete('https://jsonplaceholder.typicode.com/posts/1',
  // function(err, response) {
  //   if(err) {
  //     console.log(err);
  //   } else {
  //     consols.log(response);
  //   }
  // });