
// const msg = document.querySelector(".message");
// const buttons = document.querySelectorAll("button");
const gameplay = document.querySelector(".gameplay");
const userPlay = document.querySelector(".userPlay");
const res = document.querySelector(".res");

// let deck = [];
// const ranks = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"];
// const suits = ["hearts", "diams", "clubs", "spades"]

var cardMaster = new Vue ({
  el:'#war-cards-object',
  data:{
    msgVisible: true,
    // gameplay: document.getElementById("gameplay"),
    // userPlay: document.querySelector(".userPlay"),
    // res: document.querySelector(".res"),
    deck: [],
    ranks: [2,3,4,5,6,7,8,9,10,"J","Q","K","A"],
    suits: ["hearts", "diams", "clubs", "spades"]
  },
  methods: {
    // Listening for click just isn't needed in vue, you idiot... that's what v-on:click="" is for @click=""
    // buttons.forEach(function(item) {
    //   // listen for click, send it to playgame function
    //   item.addEventListener("click", this.playGame);
    //   })
    playGame: function(){
        // replases button toggle to make msg invisible and atk button show
        this.msgVisible = false;
        this.startGame();
    },
    buildDeck: function(){
      this.deck=[];
      // ?????? suits.forEach ?????
      // for each suit
      for(let i=0; i<this.suits.length; i++){
        // make all the cards within that suit 
        for(let j=0; j<this.ranks.length; j++){
          let card ={};
          card.suit = this.suits[i];
          card.rank = this.ranks [j];
          card.value = (j + 1);
          this.deck.push(card);
        }
      }
    },
    setupPlayers: function(num){
      players= [];
      deals= [];
      for(let x=0; x<num; x++){
        let div = document.createElement("div");
        div.setAttribute("id","player"+(x+1));
        div.classList.add("player");
        let div1 = document.createElement("div");
        div1.textContent = "Player"+(parseInt(x)+1);
        players[x] = document.createElement("div");
        players[x].textContent = "Cards:";
        div.appendChild(div1);
        div.appendChild(players[x]);
        gameplay.appendChild(div);
        deals.push([]);
      }
    },
    startGame: function(){
      let numberPlayers = document.querySelector("input").value;
      this.buildDeck();
      this.setupPlayers(numberPlayers);
    }
  },
  // computed: {
  // }
});


// Don't need to listen for button clicks when you hold the power of Vue in your hands...
// this.cardMaster.listenForBtnClick();