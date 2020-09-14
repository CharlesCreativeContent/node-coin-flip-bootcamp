const coin = document.querySelector('#coin');
const button = document.querySelector('#flip');
const status = document.querySelector('#status');
const heads = document.querySelector('#headsCount');
const tails = document.querySelector('#tailsCount');

let headsCount = 0;
let tailsCount = 0;


function deferFn(callback, ms) {
  setTimeout(callback, ms);
}

function processResult(result) {
   if (result === 'heads') {
      headsCount++;
      heads.innerText = headsCount;
    } else {
      tailsCount++;
      tails.innerText = tailsCount;
    }
    status.innerText = result.toUpperCase();
}

function flipCoin() {
    fetch(`/api?guess=heads`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            console.log(data.answer)
            
      coin.setAttribute('class', '');
     deferFn(function() {
       coin.setAttribute('class', 'animate-' + data.answer);
       deferFn(processResult.bind(null, data.answer), 2900);
     }, 100);
        });

}

button.addEventListener('click', flipCoin);
