
// components get used like custom tags for HTML <greeting></greeting>
Vue.component('greeting', {
  template:"<p> Hi there, I'm {{name}}'s reusable greeting paragraph <button v-on:click='changeName()'>Change Name</button> </p>",
  // components structurally use functions to dynamically update info. Data goes INSIDE the function
  data: function(){
    return{
      name: 'John',
      switchForName: 0
    }
  },
  methods: {
    // we can access information in the data just like a normal Vue object with this.varName
    changeName: function(){
      if (this.switchForName == 0){
      this.name = "Charles";
      this.switchForName = 1;
    } else {
      this.name = 'John';
      this.switchForName = 0;
    };
    // with a component function, each instance will be updated without affecting the other
    },
  }
});

var one = new Vue ({
  el:'#vue-app-one',
  data:{
    title:'vue app one',
    output: '',
    somethingSubmitted: false
  },
  methods: {
    readRefs: function(){
      // extract the value from the ref named "input"
      if (this.$refs.input.value == ''){
        // if nothing is submitted, return somethingSubmitted to [ false ] state
        this.somethingSubmitted = false;
      } else {
      this.output = this.$refs.input.value;
      this.somethingSubmitted = true;
      }
    }
  },
  computed: {
    greet: function(){
      return 'Hello from vue app one';
    }
  }
});

var two = new Vue({
  // controls everything in the div with this following ID
  el: '#vue-app-two',
  
  price: {initialAmount: 0},
  data: {
    title: 'vue app two',
    switchForTitle: 0,

    health: 100,
    ended: false,
    bumper: 0,

    characters: ["Asuka", "Rem", "Sherry", "Airi", "Chiaki"],
    units: [
      {name:"bard", atk:1, acc:10, def: 10, special:"inspire"},
      {name:"thief", atk:2, acc:16, def: 14, special:"steal"},
      {name:"warrior", atk:3, acc:13, def: 10, special: "armored"}
    ],
    hider: false,
    success: false,
    name: 'Alice',
    age: 23,
    wage: 25,
    targetHrs: 3,
    website: "google.com",
    websiteTag: '<a href="google.com"> second dummy link </a>',
    num: 1,
    x: 0,
    y: 0,
    a: 0,
// for CSS manipulation variables, they must first be defined in the VUE object's data
    lighting: true
  },
  methods: {
    // added boolean switch to go back and forth, lesson #14
    changeTitle: function(){
      if (this.switchForTitle == 0){
      one.title = "Title changed from second vue instance";
      this.switchForTitle = 1;
    } else {
      one.title = 'vue app one';
      this.switchForTitle = 0;
    };
    },
    generateRandInt: function() {
      let min = 15;
      let max = 21;
      let randNum = 0;
      randNum += Math.floor(Math.random() * (+max - +min)) + +min;
      console.log(`${randNum} dmg generated on hit`);  
      return randNum;
    },
    // how do I animate a red border when the punch is clicked to show a "damage" animation?
    punch: function() {
      const randNum = this.generateRandInt();
      this.health -= randNum;
      this.bumper = randNum;
      if(this.health <= 0){
        this.ended = true;
      };
    },
    // punch: function() {
    //   this.health -= this.generateRandInt();
    //   if(this.health <= 0){
    //     this.ended = true;
    //   };
    // },
    restoreSlimeHealth: function() {
      this.health = 100;
      this.ended = false;
      this.bumper = 0;
    },

    logName: function() {
      console.log(`Name entered`)
    },
    calculateWage: function(hrs) {
      if (hrs == 0) {
        return "No hustle, no cash"
      }
      else if(hrs < 0) {
        return "Can't work negative hours, silly" 
      } else {
        return this.wage*hrs
      }
    },
    greet: function(n) {
      return `Hi there, ${this.name} for your target ${n}-hour tutoring session, you'll earn $${this.wage*n}`;
    },
    updateXY: function(event) {
      this.x = event.offsetX;
      this.y = event.offsetY;
    },
  },
  computed: {
    // method only runs when the targeted method is trigger, methods tend to run all methods at the same time, computed properties only run needed stuff.
    addToA: function(){
      console.log('added to A')
      return this.a + this.age;
    },
  }
});