class EasyHTTP {
  // make an http GET request
  get(url) {
    // resolve sends a resonse, reject sense an error [READ]
    return new Promise((resolve, reject) => {
//  And then, and then, two-time tango needed to first get the promise, then extract the object...
    fetch(url).then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
    });
  }

  // make an http POST request, [CREATE] takes in DATA
  post(url, data) {
    return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
    });
  }
// Make an HTTP PUT request, (Update)

put(url, data) {
    return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
    });
  }

  // Makae HTTP DELETE request
  delete(url) {
    return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      }
      // get rid of body because not sending data
    })
      .then(res => res.json())
      .then(() => resolve('User Deleted'))
      .catch(err => reject(err));
    });
  }

}

// version 1 below ********************
// using prototypes instead of classes
// will be updated with classes in future
// focus on familiarity with prototypes and requests beyong "GET"

// function easyHTTP() {
//   // getter to set this to the XML http object
//   this.http = XMLHttpRequest()
// }

// // make an HTTP GET request ************
// // takes in a url, want the user to be able to pass in a url when using this library
// easyHTTP.prototype.get = function(url, callback) {
//   this.http.open('GET', url, true);

//   // capture "this" within a variable so you can use it at any scope by calling the variable
//   let self = this;

//   //  an arrow function = () => function {} would fix the scoping problem encountered here
//   this.http.onload = function () {
//     if(self.http.status === 200) {
//       callback(null, self.http.responseText);
//     } else {
//       callback('Error: ' + self.http.status);
//     }
//   }

//   this.http.send();
// }

// // make an HTTP POST request
// easyHTTP.prototype.post = function (url, data, callback) {
//   this.http.open('POST', url, true);
//   this.http.setRequestHeader('Content-type', 'application/json');

//   let self = this;
//   this.http.onload = function () {
//       callback(null, self.http.responseText);
//     } 

//   this.http.send(JSON.stringify(data));
// }

// // make an HTTP PUT request
// easyHTTP.prototype.put = function (url, data, callback) {
//   this.http.open('PUT', url, true);
//   this.http.setRequestHeader('Content-type', 'application/json');

//   let self = this;
//   this.http.onload = function () {
//       callback(null, self.http.responseText);
//     } 

//   this.http.send(JSON.stringify(data));
// }

// // make an HTTP DELETE request
// easyHTTP.prototype.delete = function(url, callback) {
//   this.http.open('DELETE', url, true);

//   // capture "this" within a variable so you can use it at any scope by calling the variable
//   let self = this;

//   //  an arrow function = () => function {} would fix the scoping problem encountered here
//   this.http.onload = function () {
//     if(self.http.status === 200) {
//       callback(null, 'Post was deleted');
//     } else {
//       callback('Error: ' + self.http.status);
//     }
//   }

//   this.http.send();
// }

// const posts = [
//   {title: 'Post One', body: 'This is post 1'},
//   {title: 'Post Two', body:'This is post 2'},
//   {title: 'Post Three', body:'This is post 3'}
// ];

// function createPosts(post){
//   // call resolve when you're done wiih what you're doing
//   // reject makes a call for when errors occur
//   return new Promise(function(resolve, reject){
//     setTimeout(function() {
//       posts.push(post);

//       const error = true;

//       if(!error) {
//         resolve();
//       } else {
//         reject('Error: Something went wrong');
//         // reject pairs up with catch(function(...)) below
//       }
//     }, 2000);
//   });
// }

// function getPosts() {
//   setTimeout(function(){
//     let output = '';
//     posts.forEach(function(post){
//       output += `<li>${post.title}</li>`;
//     });
//     document.body.innerHTML = output;
//   }, 1000);
// }

// createPosts({title: 'Post Four', body: 'This is post 4'}).then(getPosts).catch(function(err){
//   console.log(err);
// });