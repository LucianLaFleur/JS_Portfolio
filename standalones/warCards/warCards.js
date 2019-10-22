
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
    // placeholder arr for each player in game
    players: [],
    deals: [],
    // temp holder gets first used in makeCards()
    tempHolder: [],
    ranks: [2,3,4,5,6,7,8,9,10,"J","Q","K","A"],
    // !!! Note that these match the symbol patterns, which we'll use later
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
      let deck = this.deck;
      // ?????? suits.forEach ?????
      // for each suit
      for(let i=0; i<this.suits.length; i++){
        // make all the cards within that suit 
        for(let j=0; j<this.ranks.length; j++){
          let card ={};
          card.suit = this.suits[i];
          card.rank = this.ranks [j];
          card.value = (j + 1);
          deck.push(card);
        }
      }
    },
    setupPlayers: function(num){
      // mutate the data object containing players in an array
      players= this.players;
      deals= this.deals;
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
    showCard(el, card){
      if(card!=undefined){
        console.log(el+ " and " + card);
      // if(card) since we're checking for truthiness in JS
      el.style.backgroundColor = "white";
      // this card.suit splicing only works because the symbols for each match the strings we declared prior for each suit, following sym format.
      let html1 = card.rank + "<br>&" + card.suit + ";";
      let html2 = card.rank +"&" + card.suit + ";";
      let div = document.createElement("div");
      // NOTE: "card" alone interferes with bootstrap
      div.classList.add("pCard");

      // ??? Assuming these are top and bottom suit symbols?
      let span1 = document.createElement("span");
      span1.innerHTML = html2;
      div.appendChild(span1);
      
      let span2 = document.createElement("span");
      span2.innerHTML = html1;
      div.appendChild(span2);

      el.appendChild(div);
      }
    },
    dealCards: function(playerCard){
      let deck = this.deck;
      playerCard = (playerCard >= players.length) ? 0: playerCard;
      // INC: re-write this to make it a while/until style loop?
      if(deck.length>0){
        let randIndex = Math.floor(Math.random()*deck.length);
        let card = deck.splice(randIndex, 1)[0];
        this.deals[playerCard].push(card);
        playerCard++;
        return this.dealCards(playerCard);
      }else{
        MessageChannel.textContent= "all cards dealt"; 
        return;
      }
    },
    makeCards: function(){
      let tempHolder = this.tempHolder;
      // test alternate method iterators...
      // this.players.forEach(() => {
      // });
      // for (let x of this.players.length)
      for(let x=0; x < this.players.length; x++){
        let card = this.deals[x].shift();
        tempHolder.push(card);
        this.showCard(this.players[x],card);
      }
    },
    startGame: function(){
      let numberPlayers = document.querySelector("input").value;
      this.buildDeck();
      this.setupPlayers(numberPlayers);
      this.dealCards(0);
      this.makeCards();
    }
  },
  // computed: {
  // }
});


// Don't need to listen for button clicks when you hold the power of Vue in your hands...
// this.cardMaster.listenForBtnClick();


// made vue data object for [players] array, mutates responsive to user input value within setupPlayers() .