var socket = io();

var vm = new Vue({
  el: "#app",
  data: {
    title: 'What burger do you want?',
    menu: [],
    order: {info: {fn: '', ln: '', email: '', pay: 'Credit card', gen: 'Undisclosed'}, details: { x: '', y: ''}, items: []},
    orders: {},
    orderKey: 0,
    orderComplete: false
  },
  methods: {
    addItem: function(burger){
      this.menu.push(burger);
    },
    getNext: function () {
      var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
        return Math.max(last, next);
      }, 0);
      return lastOrder + 1;
    },
    addOrder: function (event) {
      if(!this.order.info.fn || !this.order.info.ln || !this.order.info.email || !this.order.info.pay || !this.order.info.gen || !this.order.details.x || !this.order.details.y || this.order.items.length == 0) {
        alert("You are missing something");
        return;
      }
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top};
      socket.emit("addOrder", { orderId: this.getNext(),
                                details: this.order.details,
                                orderInfo: [this.order.info.fn,
                                            this.order.info.ln,
                                            this.order.info.email,
                                            this.order.info.pay,
                                            this.order.info.gen],
                                orderItems: this.order.items
                              });
      this.orderComplete = true;
      this.orderKey = this.getNext();
    },
    displayOrder: function(event) {
            var offset = {x: event.currentTarget.getBoundingClientRect().left,
                          y: event.currentTarget.getBoundingClientRect().top};
      this.order.details = {x: event.clientX - 10 - offset.x,
                            y: event.clientY - 10 - offset.y };

    }
  },
  created: function(){
    for(const burger in food) {
      this.addItem(food[burger]);
    }
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));
  }
  })
