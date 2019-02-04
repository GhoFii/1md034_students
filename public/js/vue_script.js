new Vue({
  el: "#app",
  data: {
    title: 'What burger do you want?',
    cart: [],
    menu: [],
    order: {fn: '', ln: '', email: '', street: '', house: '', pay: 'Credit card', gen: 'Undisclosed', cart: []},
    orders: []
  },
  methods: {
    addItem: function(burger){
      this.menu.push(burger);
    },
    getOrder: function(fn, ln, email, street, house, pay, gen, cart){
      if(fn && ln && email && street && house && pay && gen && cart.length != 0) {
        this.orders.push({fn: fn, ln: ln, email: email, street: street, house: house, pay: pay, gen: gen, cart: cart});

      }
      else
        alert("You are missing something!");
    }
  },
  created(){
    for(burger in food)
      this.addItem(food[burger]);
  }
})
