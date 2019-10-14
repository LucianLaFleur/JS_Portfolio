document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {
  const number = document.querySelector('input[type="number"]').value;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function() {
    if(this.status === 200) {
      const response = JSON.parse(this.responseText);

      let output = '';

      if(response.type === 'success') {
        response.value.forEach(function(joke){
          output += `<li>${joke.joke}</li>`;
        });
      } else {
        output += '<li>something went wrong</li>';
      }
      document.querySelector('.jokes').innerHTML = output;
    }
  }

  xhr.send();
  e.preventDefault();
}


// let tdolls = JSON.parse(document.querySelectorAll('.card-bg-small'))

// let min = 1,
//     max = 10,
//     winningNum = 2,
//     guessesLeft = 3;

//     // ui elements
// const game = document.getElementById('game'),
//       minNum = document.querySelector('.min-num'),
//       maxNum = document.querySelector('.max-num'),
//       guessBtn = document.querySelector('#guess-btn'),
//       GuessInput = document.querySelector('#guess-input'),
//       message = document.querySelector('.message');

// // assign min and max to UI
// minNum.textContent = min;
// maxNum.textContent = max;
// // listen for guess made
// guessBtn.addEventListener('click', function(){
//   let guess = parseInt(guessInput.value);
// // validate
//   if(isNaN(guess) || guess < min || guess > max){
//     setMessage(`Please enter a number between ${min} and ${max}`)

//   }

// });

// // set message
// function setMessage(msg, color){
//   message.style.color = color;
//   message.textContent = msg;
// }


//  ******Mexican wave test
// let test = "strawberry".split('');
// let test = "strawberry"
// "hello";

// console.log("hello : " + wave(test));

// var wave=w=>[...w].map((a,i)=>w.slice(0,i)+a.toUpperCase()+w.slice(i+1)).filter(a=>a!=w)

// const wave = str => 
//   [...str].map((s, i) => 
//       str.slice(0, i) + s.toUpperCase() + str.slice(i + 1) 
//   ).filter(x => x != str);

//   function wave(str) {
//     return str.split('').map((l, i, a) => {
//       let c = a.slice();
//       c[i] = c[i].toUpperCase();
//       return c.join('');
//     }).filter((w, i) => w[i] !== ' ');
//   }

// function wave(inputString){
//   inputString.length == 0 ? "''" :
//   inputString.split('').forEach
// }